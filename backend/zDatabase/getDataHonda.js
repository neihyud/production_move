const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const Promise = require('bluebird')

const url = 'https://www.honda.com.vn/xe-may/san-pham'
const domain = 'https://www.honda.com.vn'


const scapeData = async (url) => {
    try {
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data)

        const products = $('#product-container .homepage-product-slide-tab a')

        const productUrls = []
        products.each((index, element) => {
            const productUrl = $(element).attr('href')
            if (productUrl) productUrls.push(productUrl)
        })

        const firstProduct = productUrls[0]

        // await test(firstProduct)

        const productsJson = []

        await Promise.map((productUrls), async (productUrl) => {
            const uri = '' + domain + productUrl
            const { data } = await axios.get(uri)

            const $ = cheerio.load(data)

            const name = $('.breadscrumb-current').text() || ''
            const description = $('.characteristics-desc').children('p').text() || ''
            const price = $('.col-12.col-lg-6.price-inner.show .price-item div span:nth-child(2)').text().trim() || ''

            const imageUrl = $('.characteristics-image img').attr('src')
            // loai dong co
            const engineType = $('.detail-item.specification .spec-inner .spec-item:nth-child(10) .spec-item-value p').text() || ''
            // dung tich toi da
            const petrolTankCapacity = $('.detail-item.specification .spec-inner .spec-item:nth-child(6) .spec-item-value p').text() || ''
            // Cong suat toi da
            const maximumCapacity = $('.detail-item.specification .spec-inner .spec-item:nth-child(11) .spec-item-value p').text() || ''
            // Tieu thu nguyen lieu
            const rawMaterialConsumption = $('.detail-item.specification .spec-inner .spec-item:nth-child(13) .spec-item-value p').text() || ''
            // dung tich dau may
            const engineOilCapacity = $('.detail-item.specification .spec-inner .spec-item:nth-child(12) .spec-item-value p').html()
            const sizeLongLargeHeigh = $('.detail-item.specification .spec-inner .spec-item:nth-child(2) .spec-item-value p').text() || ''
            // chieu cao yen xe
            const saddleHeight = $('.detail-item.specification .spec-inner .spec-item:nth-child(4) .spec-item-value p').text() || ''
            // do cao gam xe
            const chassisHeight = $('.detail-item.specification .spec-inner .spec-item:nth-child(5) .spec-item-value p').text() || ''
            // dung tich xi lanh 
            const cylinderCapacity = $('.detail-item.specification .spec-inner .spec-item:nth-child(17) .spec-item-value p').text() || ''
            // he thong khoi dong
            const bootSystem = $('.detail-item.specification .spec-inner .spec-item:nth-child(15) .spec-item-value p').text() || ''

            const productItem = {
                name, description, price, imageUrl, engineType, petrolTankCapacity,
                maximumCapacity, rawMaterialConsumption, engineOilCapacity,
                sizeLongLargeHeigh, saddleHeight, chassisHeight, cylinderCapacity, bootSystem
            }

            productsJson.push(productItem)
        }, { concurrency: 10 })

        const dataJson = JSON.stringify(productsJson)
        fs.writeFileSync('honda.json', dataJson, (err) => {
            if (err) throw err
            console.log("Data written to file")
        })
    } catch (error) {
        console.log(error)
    }
}

scapeData(url)

const test = async (itest) => {
    const ts = '' + domain + itest
    const { data } = await axios.get(ts)

    const $ = cheerio.load(data)
    const engineType = $('.detail-item.specification .spec-inner .spec-item:nth-child(10) .spec-item-value p').text() || ''


}

// app.listen(8080, () => console.log("Listening on port 8080"))


// name:
// price:
// productLine:
// description:
// imageUrl:
// loại động cơ
// dung tích bình xăng
// công suất tối đa
// mức tiêu thụ nguyên liệu
// dung tích dầu máy
// kích thước
// độ cao yen xe
// độ cao gam xe
// thoi gian bao hanh
// dung tich xi lanh
// he thong khoi dong