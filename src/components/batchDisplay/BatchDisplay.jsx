import React, { useEffect, useState } from 'react'
import '../batchDisplay/BatchDisplay.css'
import { fetchBatchList } from '../../services/api';
import ProductDisplay from '../productDisplay/ProductDisplay';

function BatchDisplay() {

  const [batches, setBatches] = useState([]);

  useEffect(()=>{
    const getBatches = async ()=>{
      try{
        const data = await fetchBatchList()
        setBatches(data);
      }catch (error){
        console.log(error)
      }
    };

    getBatches();
  }, [])

  return (
    <div>
      <section id='products'>

        {batches.map((batch, index)=>(
          <div key={batch.id}>
            <div className='container-fluid' id='batch-display-container'>
              <h2>BATCH-00{batch.id}</h2>
              <h1>{batch.title}</h1>
              <div className='batch-images-container'>
                {batch.images.map((obj, index) => (
                  <div className='batch-image' key={obj.id}>
                    <img src={obj.image} alt="/" />
                  </div>
                ))}
              </div>
            </div>
            <ProductDisplay batch_id={batch.id}/>
          </div>
        ))}
      </section>
    </div>
  )
}

export default BatchDisplay;