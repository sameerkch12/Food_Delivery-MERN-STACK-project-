import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navebar from '../components/Navebar';
import { Card } from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading status
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("https://backend-b06f.onrender.com/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navebar />
      <div>
        {loading ? (
          <div className="text-center">Loading your data...</div>
        ) : (
          <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" id='carousel'>
                <div className="carousel-item active">
                  <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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
            <div className='container'>
              {foodCat !== null ? (
                foodCat.map((data) => (
                  <div className='row mb-3'>
                    <div key={data._id} className='fs-3 m-3'>
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem !== null ? (
                      foodItem.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems => (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem={filterItems} option={filterItems.options[0]} />
                          </div>
                        ))
                    ) : (
                      <div>No such data</div>
                    )}
                  </div>
                ))
              ) : (
                <div>"********"</div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
