import React, { useState, useEffect } from "react";
import { BsFillEyeFill, BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useQuill } from "react-quilljs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { StarRater } from "./StarRater";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReviewCard() {
  // const MovieDetail = ({ movieId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [value, setValue] = useState();
  const { id } = useParams();

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.root.dataset.placeholder = "write something here.....";
      quill.on("text-change", (delta, oldDelta, source) => {
        quill.root.dataset.placeholder = "";
        console.log(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const content = quill.root.textContent;
    setValue(content);
    // props.handleCallback(content);

    //  console.log(content);
    // console.log(id);
    // console.log(localStorage.getItem('token'));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create-review/",
        {
          content: content, // Use the 'value' state to send the review content
          movie_id: id,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the user's token
          },
        }
      );
      // console.log(response.data)

      console.log(response.data.message); // Success message from Django
      toast.success("Review Successfully submitted!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  // useEffect(() => {
  //   // Check if the user has already liked the movie when the component mounts
  //   axios.get(`http://127.0.0.1:8000/check-like/${id}/`)
  //     .then((response) => {
  //       setIsLiked(response.data.isLiked);
  //     })
  //     .catch((error) => {
  //       console.error('Error checking like status:', error);
  //     });
  // }, [id]);

  const handleLike = () => {
    // Send a POST request to like the movie
    axios
      .post(
        "http://127.0.0.1:8000/like/",
        { movie_id: id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the user's token
          },
        }
      )
      .then(() => {
        setIsLiked(true);
        console.log("movie liked succesfully");
      })
      .catch((error) => {
        console.error("Error liking the movie:", error);
      });
  };

  // #F77F00

  const handleUnlike = () => {
    // Send a POST request to unlike the movie
    axios
      .post(
        "http://127.0.0.1:8000/unlike/",
        { movie_id: id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the user's token
          },
        }
      )
      .then(() => {
        setIsLiked(false);
        console.log("movie disliked succesfully");
      })
      .catch((error) => {
        console.error("Error unliking the movie:", error);
      });
  };

  const handleRate = (ratingValue) => {
    axios
      .post(
        "http://127.0.0.1:8000/rate-movie/",
        { movie_id: id, stars: ratingValue },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        console.log("movie successfully rated");
      })

      .catch((error) => {
        console.error("Error rating the movie", error);
      });
  };

  const handleDeleteRate = () => {
    // const id = 'your_movie_id'; // Replace with the actual movie ID
    // const parentRating = 'your_rating'; // Replace with the actual rating

    axios
      .post(
        "http://127.0.0.1:8000/delete-rating/",
        {
          movie_id: id,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Movie unrated");
        } else {
          console.error("Error unrating the movie");
        }
      })
      .catch((error) => {
        console.error("Error unrating the movie", error);
      });
  };

  return (
    <div className="bg-payne-gray p-4 rounded-2 ">
      <div className="d-flex gap-3 justify-content-between align-items-center">
        <span className="d-flex light-charcoal flex-column gap-1">
          <BsFillEyeFill
            className="align-self-center"
            size={50}
            style={{ cursor: "pointer" }}
          />
          <h6 className="text-center">Watch</h6>
        </span>
        <span
          className="d-flex light-charcoal flex-column gap-1"
          onClick={isLiked ? handleUnlike : handleLike}
        >
          <FaHeart
            className="align-self-center"
            size={50}
            style={{
              color: isLiked ? "#F77F00" : "#B6C1DF",
              cursor: "pointer",
            }}
          />
          <h6 className="text-center">{isLiked ? "Liked" : "Like"}</h6>
        </span>
        <span className="d-flex light-charcoal flex-column gap-1">
          <BsFillStopwatchFill
            className="align-self-center"
            size={50}
            style={{ cursor: "pointer" }}
          />
          <h6 className="text-center">Watchlist</h6>
        </span>
      </div>
      <hr className="space-cadet" />
      <div className="d-flex light-charcoal flex-column">
        <h6 className="text-center">Rate</h6>
        <span>
          <StarRater
            handleStarClick={handleRate}
          />
        </span>
        {/* <button onClick={handleDeleteRate} >delete rating</button> */}
        {/* {parentRating} */}
      </div>
      <hr className="space-cadet" />

      <h6
        className="text-center"
        data-bs-toggle="modal"
        data-bs-target="#reviewId"
        style={{ cursor: "pointer", color: "#3A86FF" }}
      >
        Review or log...
      </h6>

      <div
        class="modal fade"
        id="reviewId"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm modal-md modal-lg modal-xl"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header  bg-payne-gray">
              <h5 class="modal-title light-charcoal" id="modalTitleId">
                make a review
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body  bg-payne-gray">
              <div className="mt-3">
                <div ref={quillRef} />
              </div>
            </div>
            <div class="modal-footer  bg-payne-gray">
              <button
                type="button"
                class="btn bg-fire-engine-red "
                data-bs-dismiss="modal"
                onClick={handleReviewSubmit}
              >
                post review
              </button>
            </div>
          </div>
        </div>
      </div>

      <script>
        const myModal = new bootstrap.Modal(document.getElementById('modalId'),
        options)
      </script>
    </div>
  );
}

export default ReviewCard;
