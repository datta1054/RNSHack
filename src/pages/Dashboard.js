import React from "react";
import styles from "./Dashboard.module.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid1}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis cum
        fuga adipisci, recusandae similique perferendis nesciunt harum eos ipsum
        mollitia possimus laboriosam, asperiores maxime dolorum nulla maiores
        sint temporibus ratione!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui deleniti vel, eius non dolorem tempore architecto perferendis exercitationem dolor odit. Aspernatur illum ipsum nam, libero ab quo molestias ipsam.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ratione! Qui pariatur aperiam praesentium! Provident, totam! Veniam iste quos adipisci blanditiis natus nisi porro commodi! Ipsum natus molestiae assumenda amet!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam vel provident harum. Voluptates ea nobis possimus rerum, deleniti illum esse doloremque voluptas aut laboriosam totam maiores dignissimos tenetur reiciendis ex magnam. Nisi molestiae praesentium iure unde sequi soluta. Quas perferendis adipisci voluptates iusto nesciunt porro quia nihil officia ipsum aperiam ratione sint repudiandae sit vero, harum sed dolores voluptatum pariatur deleniti incidunt? Consectetur temporibus, expedita dicta incidunt ipsum eligendi voluptate iusto, dolorem facere odio sequi labore rem natus? Aspernatur debitis molestiae quod architecto, libero nemo a aliquam! Nemo, enim est ab rem doloribus voluptas asperiores! Laudantium odit quisquam eum deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, beatae.
      </div>
      <div className={styles.grid4}>
        <LineChart />
        <BarChart/>
        <PieChart/>
      </div>
    </div>
  );
};

export default Dashboard;
