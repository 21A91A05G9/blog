import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from './userNavbar';
import axios from 'axios';
import Card from './card';

export default function Profile() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [userBlogs, setUserBlogs] = useState(undefined);

    useEffect(() => {
        if (id !== undefined) {
            axios.get('https://blog-fjap.vercel.app/getuserblogs/' + id).then((res) => {
                setName(res.data.Name);
                setUserBlogs(res.data.userblogs);
            });
        }
    }, [id, userBlogs]);

    return (
        <>
            <UserNavbar id={id} name={name} />
            <div className='profileBlog' style={{ backgroundColor: '#d6cfbf' }}>
                <h2>User Blogs</h2>
                <div className='container'>
                    {userBlogs && userBlogs.length !== 0 ? (
                        <div className='row'>
                            {userBlogs.map((e) => (
                                <Card
                                    key={e.id} // Assuming each blog has a unique ID
                                    title={e.title}
                                    des={e.des}
                                    state={e.state}
                                    category={e.category}
                                    by={e.by}
                                    id={id}
                                    image={e.image}
                                    description={e.des}
                                    path={`/profile/${id}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center" style={{ height: '100vh' }}>
                            <h2>Please Wait Loading ...</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
