import { Container, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearch] = useState("Search");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function navigate(e) {
    e.preventDefault();
    document.getElementById("query").value = null;
    setSearch("");
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${searchField}`);
    let queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString));
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Keith Cao</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token ? (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              ) : (
                ""
              )}
            </Nav>
            {!token ? (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Log In
                  </Nav.Link>
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {token ? (
              <Form className="d-flex">
                <input
                  id="query"
                  placeholder={searchField}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" onClick={navigate}>
                  Search
                </button>
              </Form>
            ) : (
              ""
            )}
            {token ? (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      <NavDropdown.Item href="/favourites">
                        Favourites
                      </NavDropdown.Item>
                    </Nav.Link>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      <NavDropdown.Item href="/history">
                        Search History
                      </NavDropdown.Item>
                    </Nav.Link>
                  </Link>
                  <Nav.Link>
                    <NavDropdown.Item onClick={logout}>
                      Log Out
                    </NavDropdown.Item>
                  </Nav.Link>
                </NavDropdown>
              </Nav>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
