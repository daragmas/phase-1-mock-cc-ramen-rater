let ramenImgDiv = document.getElementById('ramen-menu')
let ramenDetailImg = document.getElementsByClassName('detail-image')
let ramenName = document.getElementsByClassName('name')
let ramenRestaurant = document.getElementsByClassName('restaurant')
let ramenRating = document.getElementById('rating-display')
let ramenComment = document.getElementById('comment-display')

let newRamenForm = document.getElementById('new-ramen')

let editRamen = document.getElementById('edit-ramen')

const ramenUrl = 'http://localhost:3000/ramens'

const getData = async () => {
    let req = await fetch(url = ramenUrl)
    let res = await req.json()
    return res
}

const renderImgs = async () => {
    data = await getData()
    data.map((ramen) => {
        let ramenImg = document.createElement('img')
        ramenImg.setAttribute('src', ramen.image)
        ramenImg.className = 'ramen-image'
        ramenImg.id = ramen.name
        ramenImg.addEventListener('click', (e) => {
            ramenDetailImg[0].setAttribute('src', ramen.image)
            ramenName[0].textContent = ramen.name
            ramenRestaurant[0].textContent = ramen.restaurant
            ramenRating.textContent = ramen.rating
            ramenComment.textContent = ramen.comment
        })
        ramenImgDiv.appendChild(ramenImg)
    })
}

newRamenForm.addEventListener('submit', async () => {
    console.log(newRamenForm['new-comment'].value)
    let newRamen = {
        'name': newRamenForm.name.value,
        'restaurant': newRamenForm.restaurant.value,
        'image': newRamenForm.image.value,
        'rating': newRamenForm.rating.value,
        'comment': newRamenForm['new-comment'].value
    }
    // console.log(newRamen)

    fetch(ramenUrl, {
        method: 'POST',
        body: JSON.stringify(newRamen),
        headers: { 'Content-type': "application/json; charset=UTF-8" }
    })
})

editRamen.addEventListener('submit', (e) => {
    e.preventDefault()

    const edits = {
        'rating': editRamen.rating.value,
        'comment': editRamen['new-comment'].value
    }

    if(edits.rating){
        ramenRating.textContent=edits.rating
        /*
        let ramenID = ????
        fetch(ramenUrl+ramenID,()=>{
          method:'PATCH'
          headers:{ 'Content-type': "application/json; charset=UTF-8" }
          body: JSON.stringfy(edits.rating)
        })
        */
    }
    if(edits.comment){ramenComment.textContent=edits.comment}

})



renderImgs()