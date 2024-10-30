
const products = (req, res) => {


    const data = [
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ]

    res.status(200).json(data);
}

export default products;