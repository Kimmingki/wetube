const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtns = document.querySelectorAll(".deleteComment");

const handleDeleteComment = async (event) => {
  const li = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = li;
  li.remove();
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment ";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.className = "deleteComment";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  span2.addEventListener("click", handleDeleteComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

form?.addEventListener("submit", handleSubmit);
deleteCommentBtns?.forEach((deleteCommentBtn) =>
  deleteCommentBtn.addEventListener("click", handleDeleteComment)
);
