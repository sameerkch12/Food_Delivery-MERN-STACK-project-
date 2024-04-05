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
          <div className="text-center">plz wait data is Loading ..</div>
        ) : (
          <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" id='carousel'>
                {/* Carousel items here */}
              </div>
              {/* Carousel controls here */}
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
