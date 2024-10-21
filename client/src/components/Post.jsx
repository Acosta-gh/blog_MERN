import React from 'react';

const Post = ({ index, image, title, content, author, date, category, loading }) => {
  if (loading) {
    return (
      <h1>Loading.....</h1>
    );
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()]; // Obtiene el nombre del mes
    const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea
    const year = date.getFullYear(); // Obtiene el año
    return `${month} ${day} ${year}`; // Retorna el formato "MMM DD YYYY"
  };

  return (
    <div className='post' key={index}> 
      <div className='post-image'>
        <img src={image} alt={title} />
      </div>
      <div className='post-content'>
        <h3>{category}</h3>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <div className='post-bottom'>
        <i>{author} - {formatDate(date)}</i>
      </div>
    </div>
  );
};

export default Post;
