import React, { useContext, useEffect } from "react";
import { Table, Tooltip } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataContext } from "../context/Context";
import InputSearch from "../components/InputSearch";
import FilterMovie from "../components/FilterMovie";

const MovieList = () => {
   const {
      movies,
      setMovies,
      search,
      setSearch,
      fetchStatus,
      setFetchStatus,
      filter,
      setFilter,
      history,
      functions,
   } = useContext(DataContext);

   const { fetchDataMovie, functionDeleteMovie, searchDataMovie } = functions;

   useEffect(() => {
      // Diambil dari context
      fetchDataMovie();

      if (fetchStatus) {
         fetchDataMovie();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   const handleEdit = (e) => {
      const target = e.currentTarget.value;
      history.push(`/movie-list/edit/${target}`);
   };

   const handleDelete = (e) => {
      const target = e.currentTarget.value;
      functionDeleteMovie(target);
   };

   const onChangeSearch = (e) => {
      const target = e.target.value;
      setSearch(target);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      searchDataMovie();
   };

   const onChangeFilter = (e) => {
      let { value, name } = e.target;
      setFilter({ ...filter, [name]: value });
   };

   const handleFilter = (e) => {
      e.preventDefault();
      let { rating, year, duration } = filter;

      const filterData = async () => {
         let { data } = await axios.get(
            `https://backendexample.sanbersy.com/api/data-movie`
         );
         let filterOnData = data.filter((res) => {
            return (
               res.rating === parseInt(rating) ||
               res.year === parseInt(year) ||
               res.duration === parseInt(duration)
            );
         });
         setMovies([...filterOnData]);
      };
      filterData();
      setFilter({
         rating: "",
         year: "",
         duration: "",
      });

      filterData();
   };

   const handleText = (param) => {
      if (param === null) {
         return "";
      } else {
         return param.slice(0, 50) + "...";
      }
   };

   const columns = [
      {
         title: "Image Url",
         dataIndex: "image_url",
         render: (res) => (
            <img
               src={res}
               width={100}
               height={100}
               alt={res.title}
               style={{ objectFit: "cover", borderRadius: "3px" }}
            />
         ),
      },
      {
         title: "Title",
         dataIndex: "title",
         key: "title",
      },
      {
         title: "Genre",
         dataIndex: "genre",
         key: "genre",
      },
      {
         title: "Year",
         dataIndex: "year",
         key: "year",
         sorter: (a, b) => a.year - b.year,
      },
      {
         title: "Rating",
         dataIndex: "rating",
         key: "rating",
         sorter: (a, b) => a.rating - b.rating,
      },
      {
         title: "Duration",
         dataIndex: "duration",
         key: "duration",
         sorter: (a, b) => a.duration - b.duration,
      },
      {
         title: "Description",
         dataIndex: "description",
         render: (text) => <p>{handleText(text)}</p>,
      },
      {
         title: "Review",
         dataIndex: "review",
         render: (text) => <p>{handleText(text)}</p>,
      },
      {
         title: "Action",
         key: "action",
         render: (el) => (
            <>
               <Tooltip placement="top" title="Edit Movie">
                  <button className="edit" onClick={handleEdit} value={el.id}>
                     <EditOutlined />
                  </button>
               </Tooltip>
               <Tooltip placement="bottom" title="Delete Movie">
                  <button
                     className="delete"
                     onClick={handleDelete}
                     value={el.id}
                  >
                     <DeleteOutlined />
                  </button>
               </Tooltip>
            </>
         ),
      },
   ];

   const data = movies;

   return (
      <>
         <FilterMovie
            onSubmit={handleFilter}
            onChange={onChangeFilter}
            props={filter}
         />

         <div className="home-content">
            <div className="wrapper-search">
               <Link to="/movie-list/create">
                  <button className="add-item">Add Movie</button>
               </Link>
               <InputSearch
                  onSubmit={handleSearch}
                  onChange={onChangeSearch}
                  value={search}
               />
            </div>
            <Table columns={columns} dataSource={data} rowKey={"id"} />
         </div>
      </>
   );
};

export default MovieList;
