const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

const rooms = {}


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)


    socket.on('join_room', (roomId, playerName) => {
        if (!rooms[roomId]) rooms[roomId] = []
        rooms[roomId].push({ id: socket.id, name: playerName })


        socket.join(roomId)
        console.log(`User ${playerName} joined room: ${roomId}`)


        io.to(roomId).emit('update_players', rooms[roomId])
    })


    socket.on('disconnect', () => {
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter((player) => player.id !== socket.id)
            io.to(roomId).emit('update_players', rooms[roomId])
        }
        console.log(`User disconnected: ${socket.id}`)
    })
})

// Assigning a random Spy

//Random Images to show
const images = [
    'https://media.istockphoto.com/id/1054228718/photo/indian-sweets-in-a-plate-includes-gulab-jamun-rasgulla-kaju-katli-morichoor-bundi-laddu.jpg?s=1024x1024&w=is&k=20&c=zuHus6q049UchR1NkljCmCehsB-Ty8k_k_oO8J08y0E=',
    'https://media.istockphoto.com/id/523041362/photo/indian-sweets.jpg?s=1024x1024&w=is&k=20&c=ypOUn-Jc5XS5Js_8k80SHHStuos42MqU_T-EqTcL2lk=',
    'https://media.istockphoto.com/id/1445502950/photo/gulab-petha-ladoo.jpg?s=1024x1024&w=is&k=20&c=lajwSqEbo8tD_EyUgMv2cgf-zfQREKQnA291QtPPZDw='
]

function assignRoles(roomId) {
    const roomPlayers = rooms[roomId]
    if (roomPlayers && roomPlayers.length >= 3) {
        const spyIndex = Math.floor(Math.random() * roomPlayers.length)
        const secretImage = images[Math.floor(Math.random() * images.length)]
        const randomImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit1mG6_n3S_BFqoMIDCxn8aBaB437zny7NDnJgF6qVLBi-rDo3plDBUyIOSIyvUystGoJ70SbwK2ef5a8aFA3vrma4E_21V5K4E3nOAESEJplYFONMMUDGuIrGk8Q-MzxNeZCCHNW-dnYU/s1600/budha+halwai+nashik+jalebis5.jpg' // Spy's Image


        roomPlayers.forEach((player, index) => {
            const isSpy = index ===spyIndex
            const role = isSpy ? 'Spy' : 'Agent'
            const image = isSpy ? randomImage : secretImage
            io.to(player.id).emit(`role_assignment`, { role, image })
        })
    }
}

socket.on('start_game', (roomId) => {
    assignRoles(roomId)


    let countdown = 120
    const interval = setInterval(() => {
        countdown--
        io.to(roomId).emit('timer_update', countdown)


        if(countdown <= 0) {
            clearInterval(interval)
            io.to(roomId).emit('time_up')
        }
    }, 1000)
})


server.listen(3001, () => {
    console.log('Socket.IO server running on https://localhost:3001')
})