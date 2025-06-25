import React from 'react';
import { List, Avatar, Rate } from 'antd';
import 'tailwindcss/tailwind.css';

const dummyAvatar = 'https://www.gravatar.com/avatar/?d=mp';


export const UserReviews = ({ reviews }) => {
    
    return (
        <div className="p-4">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={reviews}
                renderItem={review => (
                    <List.Item
                        key={review.id}
                        className="border-b border-gray-200 pb-4 mb-4"
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={dummyAvatar} />}
                            title={<div className="flex  items-center">
                                <span className="font-semibold text-lg mr-2">{review?.user_name}</span>
                                <Rate disabled defaultValue={Number(review.rating)} />
                            </div>}
                            description={<span className="text-gray-500 text-sm">{new Date(review.review_date).toLocaleDateString()}</span>}
                        />
                        <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: review.review_text }} />
                    </List.Item>
                )}
            />
        </div>
    );
};

