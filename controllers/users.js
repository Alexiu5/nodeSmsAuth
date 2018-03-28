
let data = [{
    name : 'alexander',
    lastName : 'Karklakovski',
    age : '27', 
    identification : '1823350101'
},{
    name : 'mary',
    lastName : 'meyers',
    age : '21', 
    identification : '010155501'
}]

module.exports = {
    home: (req, res, next)=>{
        res.send(data)
        next()
    },

    startPage :(req,res, next) =>{
        res.render('../public/main.html')
        next()
    }
}