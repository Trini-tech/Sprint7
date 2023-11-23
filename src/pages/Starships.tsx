import { useState, useEffect } from 'react';
import arrayURL from '../assets/images/imagesURL.json';
interface Starship {
  name: string;
  model: string;
  cost: string;
  speed: string;
  manufacturer: string;
  length: string;
  crew: string;
}

function fetchStarships(): Promise<Starship[]> {
  const url = 'https://swapi.dev/api/starships/?page=1';

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

  useEffect(() => {
    async function fetchData() {
      try {
        const starships = await fetchStarships();
        setStarshipsArray(starships);
      } catch (error) {
        console.error('Error fetching starships:', error);
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
      </ul>
    </main>
  );
}
