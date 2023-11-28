import { useState, useEffect } from 'react';
import arrayURL from '../assets/images/imagesURL.json';
import { Starship } from '../interfaces/interfaces';

function fetchStarships(page: number): Promise<Starship[]> {
  const url = `https://swapi.dev/api/starships/?page=${page}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((result: any) => ({
        name: result.name,
        model: result.model,
        cost: result.cost_in_credits,
        speed: result.max_atmosphering_speed,
        manufacturer: result.manufacturer,
        length: result.length,
        crew: result.crew,
      })),
    )
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}

export default function Starships() {
  const [starshipsArray, setStarshipsArray] = useState<Starship[]>([]);
  const [selectedStarshipIndex, setSelectedStarshipIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMoreStarships = async () => {
    setLoading(true);
    console.log(currentPage);
    try {
      const newStarships = await fetchStarships(currentPage + 1);
      setStarshipsArray((prevStarships) => [...prevStarships, ...newStarships]);
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching starships:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let page = 1;
        const starships: Starship[] = await fetchStarships(page);

        setStarshipsArray(starships);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching starships:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <main className="starships-list w-full">
      <ul>
        {starshipsArray.map(({ name, model, cost, speed, manufacturer, length, crew }, index) => {
          const imageData = arrayURL.find((image) => image.name === name);
          return (
            <li key={index} className="p-3 w-full">
              <div className="collapse bg-primary text-primary-content">
                <input type="radio" name="starshipAccordion" checked={index === selectedStarshipIndex} onChange={() => setSelectedStarshipIndex(index)} />
                <div className="collapse-title">
                  <div className="text-xl font-medium">{name}</div>
                </div>
                <div className="collapse-content">
                  <div className="card lg:card-side">
                    <figure>{imageData ? <img key={name} className="w-96 h-64 object-cover" src={imageData.url} alt={`Image of ${name}`} /> : <img className="w-96 h-64 object-cover" src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg" alt="No image found" />}</figure>
                    <div className="card-body">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p>Model: {model}</p>
                          <p>Cost in credits: {cost}</p>
                          <p>Atmosferic speed: {speed}</p>
                        </div>
                        <div>
                          <p>Manufacturer: {manufacturer}</p>
                          <p>Length: {length}</p>
                          <p>Crew: {crew}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <div>
          <div className="flex justify-center p-3">{loading && <div className="loading loading-spinner pb-3"></div>}</div>

          {currentPage < 4 && (
            <div className="flex justify-center">
              <button disabled={loading} className="btn" onClick={handleMoreStarships}>
                View more
              </button>
            </div>
          )}
        </div>
      </ul>
    </main>
  );
}
