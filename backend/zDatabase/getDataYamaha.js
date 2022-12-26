const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const Promise = require('bluebird')

const lines = ["xe-tay-ga", "xe-the-thao", "xe-so"]

const url = 'https://yamaha-motor.com.vn/xe/loai-xe'
const domain = 'https://yamaha-motor.com.vn/xe/'


const scapeData = async (url, productsJson) => {
    try {

        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data)

        const products = $('.product-sublist__btn a')

        const productUrls = []
        products.each((index, element) => {
            const productUrl = $(element).attr('href')
            if (productUrl) productUrls.push(productUrl)
        })

        await Promise.map((productUrls), async (productUrl) => {
            const { data } = await axios.get(productUrl)

            const $ = cheerio.load(data)

            const name = $('.slide-right__title').text().trim() || ''
            const description = 'Empty'
            const price = $('.slide-right__price').text().trim() || ''

            const imageUrl = $('.slide-right__img .image_wrap').html().split(' ')[1].split('=')[1].slice(1, -1)
            // loai dong co
            const engineType = $('.accordion .accordion-item:nth-child(1) tr:nth-child(1) td:nth-child(2)').text() || ''
            // dung tich bing xang
            const petrolTankCapacity = $('.accordion .accordion-item:nth-child(1) tr:nth-child(11) td:nth-child(2)').text() || ''
            // Cong suat toi da
            const maximumCapacity = $('.accordion .accordion-item:nth-child(1) tr:nth-child(6) td:nth-child(2)').text() || ''
            // Tieu thu nguyen lieu
            const rawMaterialConsumption = $('.accordion .accordion-item:nth-child(1) tr:nth-child(12) td:nth-child(2)').text() || ''
            // dung tich dau may
            const engineOilCapacity = $('.accordion .accordion-item:nth-child(1) tr:nth-child(10) td:nth-child(2)').html()
            // kich thuoc dai rong
            const sizeLongLargeHeigh = $('.accordion .accordion-item:nth-child(3) tr:nth-child(1) td:nth-child(2)').text() || ''
            // chieu cao yen xe
            const saddleHeight = $('.accordion .accordion-item:nth-child(3) tr:nth-child(2) td:nth-child(2)').text() || ''
            // do cao gam xe
            const chassisHeight = $('.accordion .accordion-item:nth-child(3) tr:nth-child(4) td:nth-child(2)').text() || ''
            // dung tich xi lanh 
            const cylinderCapacity = $('.accordion .accordion-item:nth-child(1) tr:nth-child(3) td:nth-child(2)').text() || ''
            // he thong khoi dong
            const bootSystem = $('.accordion .accordion-item:nth-child(1) tr:nth-child(8) td:nth-child(2)').text() || ''
            // bao hanh
            const warrantyPeriod = $('.accordion .accordion-item:nth-child(4) tr:nth-child(1) td:nth-child(2)').text() || ''

            const productItem = {
                name, description, price, imageUrl, engineType, petrolTankCapacity,
                maximumCapacity, rawMaterialConsumption, engineOilCapacity,
                sizeLongLargeHeigh, saddleHeight, chassisHeight, cylinderCapacity, bootSystem, warrantyPeriod
            }

            productsJson.push(productItem)
        }, { concurrency: 10 })

        const dataJson = JSON.stringify(productsJson)
        fs.writeFileSync('yamaha.json', dataJson, (err) => {
            if (err) throw err
            console.log("Data written to file")
        })
    } catch (error) {
        console.log(error)
    }
}

const run = async () => {
    const productsJson = []

    try {
        await Promise.map(lines, async (line) => {
            const url2 = url + '/' + line
            scapeData(url2, productsJson)
        }, { concurrency: 10 })
        console.log("Run sussessc")
    } catch (error) {
        console.log(error)
    }

}
run()


// app.listen(8080, () => console.log("Listening on port 8080"))

