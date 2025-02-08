const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./User");
const app = express()
// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public")); // CSS için
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "gizliAnahtar",
    resave: false,
    saveUninitialized: true
}));
app.set("view engine", "ejs");


const port = 3000;
app.get("/", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/giris", (req, res) => {
    res.send("BAŞARILI ŞEKİLDE GİRİŞ YAPTINIZ")
})
mongoose.connect('mongodb://127.0.0.1:27017/kullanicigiris')
    .then(() => console.log('MongoDB Connected!'));
app.listen(port, () => {
    console.log(`Sunucu ${port} çalışyor`)
})
//Kullanıcı Kaydı
app.post("/register", async (req, res) => {
    const { name , email, password } = req.body;

    try {
        let user = await User.findOne({ email});
        
        if (user) {
            return res.send("Bu e-posta zaten kayıtlı!");
        }
        const hashedPassword =  await bcrypt.hash(password,10)
        user = new User({name , email , password:hashedPassword })
        await user.save()
        res.redirect("/login")
    }catch(err){
        console.log(err)
        res.send("BİR HATA OLUŞTU")
    }
});
//Kullanıcı Giriş
app.post("/login" , async(req,res)=>{
    const {name , email ,password} = req.body;
    console.log("Gelen giriş verisi:", req.body); // Formdan gelen veriyi gör
    try{
        const user = await User.findOne({ email});
        console.log("Veritabanında bulunan kullanıcı:", user); // Kullanıcı var mı kontrol et

        console.log(user)
        if(!user){
            return res.send("KULLANICI BULUNAMADI")
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.send("ŞİFRE HATALI")
        }
        req.session.user=user
        res.redirect("/giris")
    }
    catch(err){
        console.log(err)
        res.send("BİR HATA OLUŞU")
    }
     
    })
