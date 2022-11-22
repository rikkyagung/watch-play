import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

export const DataContext = createContext();

export const DataProvider = (props) => {
   const [games, setGames] = useState([]);
   const [movies, setMovies] = useState([]);
   const [currentId, setCurrentId] = useState(null);
   const [fetchStatus, setFetchStatus] = useState(true);
   const [search, setSearch] = useState("");
   let history = useHistory();

   const [inputMovie, setInputMovie] = useState({
      title: "",
      genre: "",
      year: 0,
      rating: 0,
      duration: "",
      image_url: "",
      description: "",
      review: "",
   });

   const [inputGame, setInputGame] = useState({
      name: "",
      genre: "",
      platform: "",
      release: 0,
      image_url: "",
      singlePlayer: "",
      multiplayer: "",
   });

   const [filter, setFilter] = useState({
      rating: "",
      year: "",
      duration: "",
   });

   const [inputLogin, setInputLogin] = useState({
      email: "",
      password: "",
   });

   const [inputChangePassword, setInputChangePassword] = useState({
      current_password: "",
      new_password: "",
      new_confirm_password: "",
   });

   // Authentication
   const functionLogin = () => {
      const options = {
         method: "POST",
         url: `${process.env.REACT_APP_USER_LOGIN}`,
         params: {
            email: inputLogin.email,
            password: inputLogin.password,
         },
      };

      axios
         .request(options)
         .then((res) => {
            const { data } = res;
            const { token } = data;
            const user = res.data.user.name;

            message.success(`Hello ${user}!`);
            Cookies.set("token", token, { expires: 1 });
            history.push("/");

            setInputLogin({
               email: "",
               password: "",
            });
         })
         .catch(() => {
            message.error(`Email or Password is incorrect`);
         });
   };

   const functionChangePassword = () => {
      const options = {
         method: "POST",
         url: `${process.env.REACT_APP_CHANGE_PASSWORD}`,
         params: {
            current_password: inputChangePassword.current_password,
            new_password: inputChangePassword.new_password,
            new_confirm_password: inputChangePassword.new_confirm_password,
         },
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            history.push("/");
            message.success("Success Change Password");

            setInputChangePassword({
               current_password: "",
               new_password: "",
               new_confirm_password: "",
            });
         })
         .catch(() => {
            message.error(
               "Your Current Password or Both New Password is not same"
            );
         });
   };

   // Movie
   const fetchDataMovie = async () => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_MOVIE}`,
      };

      try {
         const { data } = await axios.request(options);

         const result = data.map((res) => {
            let {
               id,
               title,
               genre,
               year,
               rating,
               duration,
               image_url,
               description,
               review,
            } = res;

            return {
               id,
               title,
               genre,
               year,
               rating,
               duration,
               image_url,
               description,
               review,
            };
         });

         setMovies([...result]);
      } catch (error) {
         message.error(error);
         console.log(error);
      }
   };

   const fetchDataEditMovie = (slug) => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_MOVIE}/${slug}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      if (slug !== undefined) {
         axios
            .request(options)
            .then((res) => {
               const data = res.data;

               setInputMovie({
                  id: data.id,
                  title: data.title,
                  genre: data.genre,
                  year: data.year,
                  rating: data.rating,
                  duration: data.duration,
                  image_url: data.image_url,
                  description: data.description,
                  review: data.review,
               });

               setCurrentId(data.id);
            })
            .catch((error) => {
               message.error(error);
               console.log(error);
            });
      }
   };

   const functionDeleteMovie = (param) => {
      const options = {
         method: "DELETE",
         url: `${process.env.REACT_APP_DATA_MOVIE}/${param}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            history.push(`/movie-list`);
            message.success("Success Delete Movie");
            setFetchStatus(true);
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const functionSubmitMovie = () => {
      const options = {
         method: "POST",
         url: `${process.env.REACT_APP_DATA_MOVIE}`,
         params: {
            title: inputMovie.title,
            genre: inputMovie.genre,
            year: inputMovie.year,
            rating: inputMovie.rating,
            duration: inputMovie.duration,
            image_url: inputMovie.image_url,
            description: inputMovie.description,
            review: inputMovie.review,
         },
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            setInputMovie({
               title: inputMovie.title,
               genre: inputMovie.genre,
               year: inputMovie.year,
               rating: inputMovie.rating,
               duration: inputMovie.duration,
               image_url: inputMovie.image_url,
               description: inputMovie.description,
               review: inputMovie.review,
            });

            history.push(`/movie-list`);
            message.success("Success Add Movie");
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const functionEditMovie = (param) => {
      const options = {
         method: "PUT",
         url: `${process.env.REACT_APP_DATA_MOVIE}/${param}`,
         params: {
            title: inputMovie.title,
            genre: inputMovie.genre,
            year: inputMovie.year,
            rating: inputMovie.rating,
            duration: inputMovie.duration,
            image_url: inputMovie.image_url,
            description: inputMovie.description,
            review: inputMovie.review,
         },
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            setFetchStatus(true);

            history.push(`/movie-list`);
            message.success("Success Edit Movie");
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const functionDetailMovie = (slug) => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_MOVIE}/${slug}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then((res) => {
            const {
               id,
               title,
               genre,
               duration,
               rating,
               image_url,
               description,
               review,
               year,
            } = res.data;

            setInputMovie({
               id,
               title,
               genre,
               duration,
               rating,
               image_url,
               description,
               review,
               year,
            });

            setCurrentId(id);
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const searchDataMovie = async () => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_MOVIE}`,
      };

      try {
         const { data } = await axios.request(options);

         let searchOnData = data.filter((res) => {
            return Object.values(res)
               .join(" ")
               .toLowerCase()
               .includes(search.toLowerCase());
         });

         setMovies([...searchOnData]);
         setSearch("");
      } catch (error) {
         message.error(error);
         console.log(error);
      }
   };

   // Game
   const fetchDataGame = async () => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_GAME}`,
      };

      try {
         const { data } = await axios.request(options);

         let result = data.map((res) => {
            const {
               id,
               name,
               genre,
               platform,
               release,
               image_url,
               singlePlayer,
               multiplayer,
            } = res;

            return {
               id,
               name,
               genre,
               platform,
               release,
               image_url,
               singlePlayer,
               multiplayer,
            };
         });

         setGames([...result]);
      } catch (error) {
         message.error(error);
         console.log(error);
      }
   };

   const fetchDataEditGame = (slug) => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_GAME}/${slug}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      if (slug !== undefined) {
         axios.request(options).then((res) => {
            const { data } = res;

            setInputGame({
               id: data.id,
               name: data.name,
               genre: data.genre,
               platform: data.platform,
               release: data.release,
               image_url: data.image_url,
               singlePlayer: data.singlePlayer,
               multiplayer: data.multiplayer,
            });

            setCurrentId(data.id);
         });
      }
   };

   const functionSubmitGame = () => {
      const options = {
         method: "POST",
         url: `${process.env.REACT_APP_DATA_GAME}`,
         data: {
            name: inputGame.name,
            genre: inputGame.genre,
            platform: inputGame.platform,
            release: inputGame.release,
            image_url: inputGame.image_url,
            singlePlayer: inputGame.singlePlayer,
            multiplayer: inputGame.multiplayer,
         },
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then((res) => {
            history.push(`/game-list`);
            message.success("Success Add Game");

            let result = res.data;
            setInputGame({
               name: result.name,
               genre: result.genre,
               platform: result.platform,
               release: result.release,
               image_url: result.image_url,
               singlePlayer: result.singlePlayer,
               multiplayer: result.multiplayer,
            });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const functionEditGame = (param) => {
      const options = {
         method: "PUT",
         url: `${process.env.REACT_APP_DATA_GAME}/${param}`,
         data: {
            name: inputGame.name,
            genre: inputGame.genre,
            platform: inputGame.platform,
            release: inputGame.release,
            image_url: inputGame.image_url,
            singlePlayer: inputGame.singlePlayer,
            multiplayer: inputGame.multiplayer,
         },
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            setFetchStatus(true);
            // let newGame = game.find((el) => el.id === currentId);
            // console.log(newGame);
            // newGame.name = name;
            // newGame.genre = genre;
            // newGame.platform = platform;
            // newGame.release = release;
            // newGame.image_url = image_url;
            // newGame.singlePlayer = singlePlayer;
            // newGame.multiplayer = multiplayer;
            // setGame([...game]);

            history.push(`/game-list`);
            message.success("Success Edit Game");
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const functionDeleteGame = (param) => {
      const options = {
         method: "DELETE",
         url: `${process.env.REACT_APP_DATA_GAME}/${param}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then(() => {
            setFetchStatus(true);

            history.push(`/game-list`);
            message.success("Success Delete Game");
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const functionDetailGame = (slug) => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_GAME}/${slug}`,
         headers: {
            Authorization: "bearer" + Cookies.get("token"),
         },
      };

      axios
         .request(options)
         .then((res) => {
            let result = res.data;
            setInputGame({
               id: result.id,
               name: result.name,
               genre: result.genre,
               platform: result.platform,
               release: result.release,
               image_url: result.image_url,
               singlePlayer: result.singlePlayer,
               multiplayer: result.multiplayer,
            });

            setCurrentId(result.id);
         })
         .catch((error) => {
            message.error(error);
            console.log(error);
         });
   };

   const searchDataGame = async () => {
      const options = {
         method: "GET",
         url: `${process.env.REACT_APP_DATA_GAME}`,
      };

      try {
         const { data } = await axios.request(options);
         const searchOnData = data.filter((res) => {
            return Object.values(res)
               .join(" ")
               .toLowerCase()
               .includes(search.toLowerCase());
         });
         setGames([...searchOnData]);
         setSearch("");
      } catch (error) {
         message.error(error);
         console.log(error);
      }
   };

   const functions = {
      functionLogin,
      functionChangePassword,
      fetchDataMovie,
      fetchDataEditMovie,
      functionSubmitMovie,
      functionEditMovie,
      functionDeleteMovie,
      functionDetailMovie,
      searchDataMovie,
      fetchDataGame,
      fetchDataEditGame,
      functionSubmitGame,
      functionEditGame,
      functionDeleteGame,
      functionDetailGame,
      searchDataGame,
   };

   return (
      <DataContext.Provider
         value={{
            inputLogin,
            setInputLogin,
            inputChangePassword,
            setInputChangePassword,
            movies,
            setMovies,
            inputMovie,
            setInputMovie,
            games,
            setGames,
            inputGame,
            setInputGame,
            currentId,
            setCurrentId,
            fetchStatus,
            setFetchStatus,
            search,
            setSearch,
            filter,
            setFilter,
            history,
            functions,
         }}
      >
         {props.children}
      </DataContext.Provider>
   );
};
