import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  //usesState always returns Array with 2 elements
  const [isLoading, setIsLoading] = useState(true);
  const [LoadedMeetups, setLoadedMeetups] = useState([]);

  //with useEffect it fetch() runs once
  useEffect(() => {
    setIsLoading(true);

    fetch(
      "https://react-meetups-ec0a9-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data){
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  //https://react-meetups-ec0a9-default-rtdb.europe-west1.firebasedatabase.app/

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={LoadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
