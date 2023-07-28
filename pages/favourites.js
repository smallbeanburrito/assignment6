/*********************************************************************************
 *  WEB422 – Assignment 5
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Keith Cao Student ID: 143332211 Date: July 15, 2023
 *  Vercel Link: https://assignment5-zeta.vercel.app/
 *
 ********************************************************************************/
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Home() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;

  if (favouritesList?.length > 0) {
    return (
      <>
        <Row className="gy-4">
          {favouritesList.map((data) => (
            <Col lg={3} key={data}>
              <ArtworkCard objectID={data} />
            </Col>
          ))}
        </Row>
      </>
    );
  } else {
    return (
      <div>
        <h4>Nothing Here</h4>Try adding some new artwork to the list.
      </div>
    );
  }
}
