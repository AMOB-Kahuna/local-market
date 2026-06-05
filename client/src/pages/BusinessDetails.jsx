import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Rating from "../components/Rating";

const BusinessDetails = () => {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);

  useEffect( () => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/businesses/${id}/`);
        const data = await res.json();
        setBusiness(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBusiness();
  }, [id])

  console.log(business);

  return (
    <>
      {
        business ?
        <div>
          <section>
            <img src="/pottery.jpg" alt="" className="w-full h-50" />

            <div className="mt-5 text-center">
              <h2 className="font-[Abril_Fatface] text-2xl font-bold">{business.name}</h2>

              <Rating rating={business.average_rating} />

              <p>{business.location}</p>

              <p>Status</p>

              <div className="w-full flex flex-col gap-3 px-10 mt-5">
                <button className="bg-[#F0A500] py-2 px-5 rounded-xl text-[#FFFDF5]">Contact Business</button>
                <button className="border border-[#F0A500] py-2 px-5 rounded-xl">Contact Business</button>
                <button className="border border-[#F0A500] py-2 px-5 rounded-xl">Contact Business</button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-[Abril_Fatface] text-2xl font-bold">About Us</h2>

            <p>{business.detailed_description}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-[Abril_Fatface] text-2xl font-bold">Reviews</h2>

            <p>This business has no review yet</p>
          </section>

          <section className="mt-10">
            <h2 className="font-[Abril_Fatface] text-2xl font-bold">Contact Info</h2>

            <p>{business.location}</p>
            <p>{business.phone}</p>
            <p>{business.email}</p>
            <p>{business.whatsapp_number}</p>
            <p>{business.facebook_handle}</p>
            <p>{business.twitter_handle}</p>
            <p>{business.instagram_handle}</p>
          </section>
        </div> :
        <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Loading...</h1>
      }
    </>
  )
}

export default BusinessDetails