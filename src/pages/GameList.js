import React, { useContext, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataContext } from "../context/Context";
import InputSearch from "../components/InputSearch";

const GameList = () => {
   const {
      games,
      fetchStatus,
      setFetchStatus,
      search,
      setSearch,
      functions,
      history,
   } = useContext(DataContext);

   const { fetchDataGame, functionDeleteGame, searchDataGame } = functions;

   useEffect(() => {
      fetchDataGame();

      if (fetchStatus) {
         fetchDataGame();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   const handleEdit = (e) => {
      let target = e.currentTarget.value;
      history.push(`/game-list/edit/${target}`);
   };

   const handleDelete = (e) => {
      const target = e.currentTarget.value;
      functionDeleteGame(target);
   };

   const onChangeSearch = (e) => {
      const target = e.target.value;
      setSearch(target);
   };

   const handleSearch = (e) => {
      e.preventDefault();

      searchDataGame();
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
               alt={res.name}
               style={{ objectFit: "cover", borderRadius: "3px" }}
            />
         ),
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Genre",
         dataIndex: "genre",
         key: "genre",
      },
      {
         title: "Platform",
         dataIndex: "platform",
         key: "platform",
      },
      {
         title: "Release",
         dataIndex: "release",
         key: "release",
         sorter: (a, b) => a.release - b.release,
      },
      {
         title: "Single Player",
         dataIndex: "singlePlayer",
         key: "singlePlayer",
         sorter: (a, b) => a.singlePlayer - b.singlePlayer,
      },
      {
         title: "Multi Player",
         dataIndex: "multiplayer",
         key: "multiplayer",
         sorter: (a, b) => a.multiplayer - b.multiplayer,
      },
      {
         title: "Action",
         key: "action",
         render: (el) => (
            <>
               <Tooltip placement="top" title="Edit Game">
                  <button className="edit" onClick={handleEdit} value={el.id}>
                     <EditOutlined />
                  </button>
               </Tooltip>
               <Tooltip placement="bottom" title="Delete Game">
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

   const data = games;

   return (
      <div className="home-content">
         <div className="wrapper-search">
            <Link to="/game-list/create">
               <button className="add-item">Add Game</button>
            </Link>
            <InputSearch
               onSubmit={handleSearch}
               onChange={onChangeSearch}
               value={search}
            />
         </div>
         <Table columns={columns} dataSource={data} rowKey={"id"} />
      </div>
   );
};

export default GameList;
