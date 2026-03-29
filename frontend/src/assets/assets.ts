import background from "./images/background.png"
import img1 from "./images/image1.jpg"
import img2 from "./images/image2.jpg"
import img3 from "./images/image3.jpg"
import img4 from "./images/image4.jpg"
import img5 from "./images/image5.jpg"
import avatar from "./images/avatar.png"


export const assets = {
    background,
    img1,
    img2,
    avatar

}
export const dummyUsers=[
    {id:"u1",
        name:"Alex Johnson",
        avatar:img1,
        online:true,
        unreadCount:1
    },
    {id:"u2",
        name:"Emily Carter",
        avatar:img2,
        online:true,
        unreadCount:0
    },
    {id:"u3",
        name:"Michael Brown",
        avatar:img3,
        online:true,
        unreadCount:2
    },
    {id:"u4",
        name:"Sarah Wilson",
        avatar:img4,
        online:false,
        unreadCount:0
    },
    {id:"u5",
        name:"David Lee",
        avatar:img5,
        online:true,
        unreadCount:3
    },
]

export const dummyMessages=[
    {
        id:"m1",
        senderId:"u1",
        receiverId:"u2",
        content:"Hey, how are you?",
        createdAt:"2022-01-01T12:00:00Z",
        
    },
    {
        id:"m2",
        senderId:"u2",
        receiverId:"u1",
        content:"I'm fine, thank you!",
        createdAt:"2022-01-01T12:01:00Z",
        
    },
    {
        id:"m3",
        senderId:"u1",
        receiverId:"u2",
        content:"What are you doing?",
        createdAt:"2022-01-01T12:02:00Z",
        
    },
    {
        id:"m4",
        senderId:"u2",
        receiverId:"u1",
        content:"I'm working on a project.",
        createdAt:"2022-01-01T12:03:00Z",
        
    },
    {
        id:"m5",
        senderId:"u1",
        receiverId:"u2",
        content:"That's great!",
        createdAt:"2022-01-01T12:04:00Z",
        
    },
    {
        id:"m6",
        senderId:"u2",
        receiverId:"u1",
        content:"Thanks!",
        createdAt:"2022-01-01T12:05:00Z",
        
    },
    {
        id:"m7",
        senderId:"u1",
        receiverId:"u2",
        content:"What are you working on?",
        createdAt:"2022-01-01T12:06:00Z",
        
    },
    {
        id:"m8",
        senderId:"u2",
        receiverId:"u1",
        content:"I'm working on a project.",
        createdAt:"2022-01-01T12:07:00Z",
        
    },
    {
        id:"m9",
        senderId:"u1",
        receiverId:"u2",
        content:"That's great!",
        createdAt:"2022-01-01T12:08:00Z",
        
    },
    {
        id:"m10",
        senderId:"u2",
        receiverId:"u1",
        content:"Thanks!",
        createdAt:"2022-01-01T12:09:00Z",
        
    },
]