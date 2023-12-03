import AWS from "aws-sdk";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPaperclip, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { Select, Option } from "@material-tailwind/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import Popup from "reactjs-popup";
import DataGraph from "./graph";
import "reactjs-popup/dist/index.css";
import ReactLoading from "react-loading";
import { BsSearch } from "react-icons/bs";

// import MyForceGraphComponent from "./graph";

const SidebarComponent = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [isHiddenAddPaperForm, setisHiddenAddPaperForm] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [selectCollectionName, setSelectCollectionName] = useState(false);
  const [listCollection, setListCollection] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const [collections, setCollections] = useState([]);
  const [uploadState, setUploadState] = useState(null);
  const [paperNames, setPaperNames] = useState([]);
  const cookie = new Cookies(null, { path: "/" });
  const [collectionPaperNames, setCollectionPaperNames] = useState([]);
  const token = cookie.get("token");
  const [searchPaperNames, setSearchPaperNames] = useState(null);
  const [paperInCollection, setPaperInCollection] = useState(null);
  const [addNotesText, setAddNotesText] = useState(null);
  const [addNotesPaperId, setAddNotesPaperId] = useState(null);
  let commentStr = "";

  const [paperIdWhileAddingToCollection, setPaperIdWhileAddingToCollection] =
    useState(null);
  useEffect(() => {
    if (token) {
      fetchCollections();
      fetchPapers();
    }
    async function fetchCollections() {
      try {
        const response = await fetch("http://localhost:5000/collections", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    }

    async function fetchPapers() {
      try {
        const response = await fetch("http://localhost:5000/research-papers/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();

        let namesArray = [];

        data.data.forEach((element) => {
          namesArray.push(element);
        });

        setPaperNames(namesArray);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    }
  }, [token, collectionPaperNames, collections, paperNames]);

  const collectionList = Array.isArray(collections) ? collections : [];
  const paperList = Array.isArray(paperNames) ? paperNames : [];
  function showCollections() {
    setListCollection(true);
  }

  async function addCollection() {
    try {
      const response = await fetch("http://localhost:5000/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify({
          name: collectionName,
        }),
      });
      const json_res = await response.json();
      console.log(json_res);
    } catch (error) {
      console.log(error);
    }
    setListCollection(false);
  }

  async function removeCollection(collectionId) {
    try {
      const response = await fetch(
        `http://localhost:5000/collections/${collectionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json_res = await response.json();
      console.log(json_res);
    } catch (error) {
      console.log(error);
    }
  }

  async function getNotes(paperId) {
    try {
      const response = await fetch(
        `http://localhost:5000/research-papers/${paperId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json_res = await response.json();
      const comment = [];
      json_res.data.comments.forEach((element) => {
        comment.push(element);
      });
      for (let i = 0; i < comment.length; i++) {
        commentStr += comment[i] + "\n";
      }
      alert(commentStr);

      // console.log(json_res);
    } catch (error) {
      console.log(error);
    }
  }

  function addPaper() {
    setisHiddenAddPaperForm(true);
  }
  async function selectCollection(id) {
    setSelectCollectionName(id);
    setCollectionPaperNames(null);
    try {
      const response = await fetch(`http://localhost:5000/collections/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const json_res = await response.json();
      let arr = [];
      json_res.researchPapers.forEach((element) => {
        arr.push(element.name);
      });
      // console.log(arr);

      setCollectionPaperNames(arr);
      console.log(collectionPaperNames);
    } catch (error) {
      console.log(error);
    }
    setSelectCollectionName(null);
  }

  function handleSearchClick() {
    if (searchVal === "") {
      setSearchPaperNames([]);
      return;
    }
    const filterBySearch = paperList.filter((item) => {
      if (item.name.toLowerCase().includes(searchVal.toLowerCase()  )) {
        return item;
      }
    });
    setSearchPaperNames(filterBySearch);
  }

  async function addNotes(paperId) {
    setAddNotesPaperId(paperId);
    let note = prompt("Add Comment");
    console.log(note);
    try {
      const response = await fetch(
          `http://localhost:5000/research-papers/${paperId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            comment: note,
          }),
        }
      );
      // console.log("here");
      const json_res = await response.json();
      console.log(json_res);
    } catch (error) {
      // console.log("here1");

      console.log(error);
    }
    setAddNotesPaperId(null);
  }

  async function removePaper(paperId) {
    try {
      const response = await fetch(
        `http://localhost:5000/research-papers/${paperId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json_res = await response.json();
      console.log(json_res);
    } catch (error) {
      console.log(error);
    }
  }

  function logoutFunction() {
    cookie.remove("token", "/");
    navigate("/");
  }

  async function handleAddCollectionChange(value) {
    try {
      const response = await fetch(
        `http://localhost:5000/collections/${value}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            id: paperIdWhileAddingToCollection,
          }),
        }
      );
      const json_res = await response.json();
      console.log(json_res);
    } catch (error) {
      console.log(error);
    }
    setPaperIdWhileAddingToCollection(null);
  }
  function addToCollection(paperId) {
    setPaperIdWhileAddingToCollection(paperId);
  }
  const handleAddNotes = (e) => {
    const notes = e.target.value;
    setAddNotesText(notes);
  };
  const handleAddNewCollection = (e) => {
    const collectionName = e.target.value;

    setCollectionName(collectionName);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFile(file);
  };

  const mystyle = {
    marginLeft: "600px",
    marginTop: "20px",
    fontWeight: "700",
  };

  const uploadFile = async () => {
    setUploadState(true);

    const S3_BUCKET = "ssdproject";

    const REGION = "ap-south-1";

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: "application/pdf",
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then(async (data, err) => {
      var url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      console.log(url);
      console.log(data);
      try {
        const response = await fetch("http://localhost:5000/research-papers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            name: params.Key,
            url: url,
            description: "abdawd",
          }),
        });
        const json_res = await response.json();
        console.log(json_res);
      } catch (error) {
        console.log(error);
      }
      setisHiddenAddPaperForm(false);
      // alert("File uploaded successfully.");
      setUploadState(false);
    });
  };

  return (
    <>
      <div className="flex">
        <div className="h-screen w-[300px] shadow-lg rounded bg-rose-50">
          <div className="p-2 py-4 w-full">
            <h1 className="text-stone-700 font-extrabold text-center text-3xl">
              ResearchEase
            </h1>
          </div>
          {/* Profile */}
          <div className="p-2 px-3 flex w-full justify-between items-center border-gray-300 border-t-2 border-b-2">
            <div className="flex gap-6">
              <img
                className="w-[40px] h-[40px] rounded-[50px] mt-1"
                src="https://picsum.photos/40"
                alt="avatar image"
              />
              <div>
                <h3 className="text-xl font-bold">Harsh Shah</h3>
                <h4 className="text-sm font-semibold">Student</h4>
              </div>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          {/* Add Collection */}
          <div className="w-full flex flex-col items-start p-4">
            <div
              className="cursor-pointer flex items-center gap-2 pb-2"
              onClick={showCollections}
            >
              <span className="pb-[2px] text-4xl">+</span>
              <h4 className="text-lg font-semibold">Collections</h4>
            </div>
            <textarea
              type="text"
              onChange={handleAddNewCollection}
              id="listCollection"
              className={
                listCollection
                  ? "bg-gray-100 w-full border-2 border-gray-400"
                  : "hidden " + "bg-gray-100 w-full border-2 border-gray-400"
              }
            ></textarea>
            <button
              class={
                listCollection
                  ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  : "hidden " +
                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              }
              onClick={addCollection}
            >
              Add-Collection
            </button>

            <div className="w-full pl-2">
              <ul className="w-full flex flex-col gap-2 ">
                {collectionList.map((collection) => (
                  <>
                    <li
                      key={collection._id}
                      className={"flex w-full justify-between items-center"}
                    >
                      <h4
                        onClick={() => selectCollection(collection._id)}
                        className="cursor-pointer font-medium"
                      >
                        {collection.name}
                      </h4>
                      <div>
                        <div>
                          <button
                            onClick={() => removeCollection(collection._id)}
                            className="focus:outline-none mr-1"
                          >
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className={
                          selectCollectionName === collection._id
                            ? "flex w-72 flex-col gap-6"
                            : "hidden flex w-72 flex-col gap-6"
                        }
                      >
                        {/* { console.log(paperInCollection)} */}
                        <li
                          key={"ReactJS.pdf"}
                          className="bg-red-200 flex w-full justify-between items-center"
                        >
                          <Link
                            to={
                              "https://ssdproject.s3.amazonaws.com/ReactJS.pdf"
                            }
                            target="_blank"
                          >
                            <h4 className="font-medium">
                              {/* {{paper.name.length < 20
                                  ? paper.name
                                  : paper.name.substr(0, 20) + "..."}} */}
                              {"ReactJS.pdf"}
                            </h4>
                          </Link>
                        </li>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </div>

            <div className="cursor-pointer flex items-center gap-2 pb-2">
              <h4 className="text-lg font-semibold">Paper</h4>
            </div>

            <div className="w-full pl-2">
              <ul className="w-full flex flex-col gap-2 cursor-pointer">
                {paperNames.map((paper) => (
                  <>
                    <li
                      key={paper._id}
                      className="bg-red-200 flex w-full justify-between items-center"
                    >
                      <Link to={paper.url} target="_blank">
                        <h4 className="font-medium">
                          {paper.name.length < 20
                            ? paper.name
                            : paper.name.substr(0, 20) + "..."}
                        </h4>
                      </Link>

                      {/* <div>
                        <h4>Popup - Scaler Academy</h4>
                        <Popup
                          // trigger={<button> Click to open popup </button>}
                          position="right centre"
                        >
                          <div>Scaler Academy</div>
                          <button>Click here</button>
                        </Popup>
                      </div> */}

                      <div className="flex items-center">
                        <button
                          onClick={() => addToCollection(paper._id)}
                          className="focus:outline-none mr-1"
                        >
                          <FaPaperclip />
                        </button>
                        <button
                          onClick={() => getNotes(paper._id)}
                          className="focus:outline-none mr-1"
                        >
                          <CgNotes />
                        </button>
                        <button
                          onClick={() => addNotes(paper._id)}
                          className="focus:outline-none mr-1"
                        >
                          <FaRegPenToSquare />
                        </button>
                        <button
                          className="focus:outline-none"
                          onClick={() => removePaper(paper._id)}
                        >
                          <span>
                            <FaTrashCan />
                          </span>
                        </button>
                      </div>
                    </li>

                    <li>
                      <div
                        className={
                          paperIdWhileAddingToCollection === paper._id
                            ? "flex w-72 flex-col gap-6"
                            : "hidden flex w-72 flex-col gap-6"
                        }
                      >
                        <Select
                          variant="outlined"
                          onChange={(e) => {
                            console.log(e);
                            handleAddCollectionChange(e);
                          }}
                          label="Select Collection"
                          style={{ width: "100%" }}
                          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        >
                          {collectionList.map((collection) => (
                            <Option key={collection._id} value={collection._id}>
                              {collection.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addPaper}
          >
            Upload Paper
          </button>
          <label
            htmlFor="formFile"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          ></label>
          <input
            className={
              isHiddenAddPaperForm
                ? "relative mt-2 mb-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600"
                : "hidden " +
                  "relative mt-2 mb-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600"
            }
            type="file"
            onChange={handleFileChange}
            id="addPaper"
          />
          <div className></div>

          <button
            className={
              isHiddenAddPaperForm
                ? "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                : "hidden " +
                  "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            }
            id="newButton"
            onClick={uploadFile}
          >
            {uploadState ? (
              <ReactLoading
                type="spinningBubbles"
                color="#ffffff"
                height={25}
                width={30}
              />
            ) : (
              "Upload"
            )}
          </button>
          <div className="flex items-center justify-center">
            <button
              onClick={logoutFunction}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6 flex items-center cursor-pointer"
            >
              <span className="mr-2">
                <RiLogoutBoxLine />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
        {/* {console.log({ commentStr })} */}
        <div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <input
                className="border border-solid border-gray-300 p-2"
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search..."
              />
              <BsSearch
                onClick={handleSearchClick}
                className="ml-2 cursor-pointer"
              />
            </span>
          </div>
          <div>
            {searchPaperNames
              ? searchPaperNames.map((paper) => {
                  return (
                    <div style={mystyle}>
                      <Link
                        to={`https://ssdproject.s3.amazonaws.com/${paper.name}`}
                      >
                        {paper.name}
                      </Link>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
