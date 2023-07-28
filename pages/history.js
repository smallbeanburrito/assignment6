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
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import style from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function Home() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let parsedHistory = [];
  if (!searchHistory) return null;

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  if (parsedHistory.length == 0) {
    return (
      <div>
        <h4>Nothing Here</h4>Try adding some new artwork to the list.
      </div>
    );
  } else {
    return (
      <ListGroup>
        {parsedHistory.map((historyItem, index) => (
          <ListGroupItem
            className={style.historyListItem}
            onClick={(e) => historyClicked(e, index)}
          >
            {Object.keys(historyItem).map((key) => (
              <>
                {key}: <strong>{historyItem[key]}</strong>&nbsp;
              </>
            ))}
            <Button
              className="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}
