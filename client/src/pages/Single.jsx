import React from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img"
        />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="img"
          />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="edit" />
            </Link>
            <img src={Delete} alt="delete" />
          </div>
        </div>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          optio?
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          temporibus hic nisi odit, deserunt quibusdam iure inventore cupiditate
          nemo exercitationem quis consectetur ipsa fugit aut qui dolorem autem
          omnis tempora, ut debitis ea obcaecati aperiam! Officia, vero est.
          Veritatis beatae facilis quis ut pariatur corrupti praesentium rem
          laboriosam mollitia temporibus.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          commodi fugiat alias, accusantium iste dignissimos veniam aspernatur
          asperiores molestias, unde optio vitae illo ratione autem corporis
          maiores fugit quos error qui vero saepe. Quae, cupiditate consequuntur
          saepe corrupti quas distinctio! Perferendis adipisci neque esse
          maiores delectus sunt repudiandae reprehenderit quas!
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora,
          repellat, eligendi error suscipit, deleniti autem repellendus laborum
          aspernatur veniam inventore quasi eveniet nesciunt natus. At, ducimus
          magni? Earum a dolorem similique optio at, impedit aperiam
          voluptatibus doloribus ab est suscipit pariatur? Enim vel nulla est
          amet, nostrum id beatae?
        </p>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
