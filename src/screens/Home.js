import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navebar from '../components/Navebar'
import { Card } from '../components/Card'


export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
 

  const loadData = async () => {
    let response = await fetch("https://backend-b06f.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div >
    <div>
      <Navebar />
    </div>
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

        <div className="carousel-inner " id='carousel'>
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
             
            </div>
          </div>
          <div className="carousel-item active" >
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


    </div>

        <div className='container' >
          {
            foodCat !== null
              ? foodCat.map((data) => {
                return (
                  <div className='row mb-3'>
                    <div key={data._id} className='fs-3 m-3'>
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem !== null
                      ?
                      foodItem.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className=' col-12 col-md-6 col-lg-3'>
                              <Card foodItem={filterItems}
                                option={filterItems.options[0]}
                                //imgSrc={filterItems.img}
                              />
                            </div>
                          )
                        })
                      : <div>No such daya</div>}
                  </div>
                )
              })
              : <div>"********"</div>
          }

        </div>
        <div>   <Footer /> </div>

      </div>
      
      )
}
