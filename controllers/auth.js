import { db } from "../db.js"
import bcrypt from "bcryptjs"

export const register = (req, res) => {
    // res.json("This is post con")
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.bady.email, req.bady.name], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!")

        //Hash 加密
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashync(req.bady.password, salt);

        const q = "INSET INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.bady.username,
            req.bady.email,
            hash
        ]

        db.query(q, [values], (req, res) => {
            if (err) return res.json(err)
                return res.status(200).json("User has been created")
        })

    })
}
export const login = (req, res) => {
    res.json("This is post con")
}
export const logout = (req, res) => {
    res.json("This is post con")
}