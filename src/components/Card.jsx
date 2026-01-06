import React from "react";

export default function Card({ title, image, children, badge }) {
  return (
    <div className="card">
      {image ? <img src={image} alt={title || "card"} style={{ width: "100%", display: "block" }} /> : null}
      <div className="card-body">
        {badge ? <div className="badge" style={{marginBottom:10}}>{badge}</div> : null}
        {title ? <div className="h2" style={{fontSize:20}}>{title}</div> : null}
        <div className="p">{children}</div>
      </div>
    </div>
  );
}
