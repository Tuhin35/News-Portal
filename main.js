const allMenu = document.getElementById('all-menu')
const allCard = document.getElementById('card-field')
const notFound = document.getElementById("not-found")
const showNewsTitle = document.getElementById("show-news-title")

const loadCatagoryData = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategoryData(data.data.news_category))


}
loadCatagoryData();

const showCategoryData = (items) => {

    items.forEach(item => {

        const li = document.createElement('li')
        li.classList.add("mx-auto")
        li.innerHTML = `<a>${item.category_name} </a>`
        // console.log(item.category_name);
        allMenu.appendChild(li)
        li.addEventListener("click", () => {
            cardPostsid1(`${item.category_id}`,`${item.category_name}`), cardPostsid(`${item.category_id}`);


        });



    })

}

const cardPostsid = (id,) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`

    fetch(url)
        .then(res => res.json())
        // .then(data1 => showNewsAllTitle(data1.data))
        .then(data => displayCardInfo(data.data))



}
const cardPostsid1 = (id,name) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  console.log(name);
    fetch(url)
        .then(res => res.json())
        // .then(data1 => showNewsAllTitle(data1.data))
        .then(data => showNewsAllTitle(data.data,name))



}

const showNewsAllTitle = (titles,name) => {

    showNewsTitle.textContent = ""

    const newsTitle = document.createElement('h2')
    newsTitle.classList.add("text-center")
    newsTitle.innerHTML = `<h2>${titles.length}  News found for this category at this mument ${name} </h2>`
    showNewsTitle.appendChild(newsTitle);





}

const displayCardInfo = (newses) => {




    if (newses.length == 0) {

        const li = document.createElement('li')
        li.innerHTML = `<h2> +"there is no news" </h2>
        
        `

        notFound.appendChild(li)


    }

    notFound.textContent = " "
    allCard.textContent = " "

    newses.forEach(news => {


        
       
        const li = document.createElement('li')
        li.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl flex flex-row  w-9/12 mx-auto">
        <figure><img src="${news.thumbnail_url}" alt="Movie"></figure>
       
       
        <div class="card-body">
            <h1 class="card-title">${news.title}</h1>
                <p class="card">${news.details.length > 50 ? news.details.slice(0, 50) + "..." : news.details}</p>

                <div class="flex  flex-row gap-5  ">
                        <div class="flex">
                                <div>
                                    <img class="w-24  rounded-full" src="${news.author.img}" />
                                </div>
                                <div class= "felx flex-start m-auto">
                                    <h2>publisher : ${news.author.name != null ? news.author.name : " NO publisher For this News" }</h2> <br>
                                    
                                     <h2>date :${news.author.published_date != null ? news.author.published_date : "no date for this news" }</h2>
                                
                                    
                                </div>

                            <div class= "">
                              ${news.total_view != null ? news.total_view +"M" : "No viwes For this News" }
                            
                                
                            </div>
                            <div class= "">
                            <label for="my-modal-3" onclick="showModal('${news.image_url}','${news.author.name}','${news.author.published_date}')" class="btn btn-primary modal-button">Show details</label>
                            
                                
                            </div>


                               

                                
                        </div>
                   
                </div>
            </div>
    </div>`



        allCard.appendChild(li);


    })



    

}
const showModal = (image, name, date) => {

    const modalBody = document.getElementById('modal-bd')

    modalBody.innerHTML = `
    <figure><img src="${image}" class="h-80 w-full" alt="Shoes" /></figure>
    <p class="py-4">publisher Name :   ${name != "null"?name :" NO publisher For this News " }  </p> 
    <p class="py-4"> publisher Date : ${date}</p> `



}