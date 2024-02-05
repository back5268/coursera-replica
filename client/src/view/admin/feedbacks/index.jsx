import React, { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import Reviews from "@view/admin/feedbacks/Reviews";
import Questions from "@view/admin/feedbacks/Questions";

export default function Feedbacks() {
    const [buttonActive, setButtonActive] = useState("tab1");

    const handleButtonClick = (value) => {
        if (value === buttonActive) {
            return;
        }
        setButtonActive(value);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-xl">
            <TETabs>
                <TETabsItem
                    onClick={() => handleButtonClick("tab1")}
                    active={buttonActive === "tab1"}
                    tag="button"
                >
                    Đánh giá của người dùng
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleButtonClick("tab2")}
                    active={buttonActive === "tab2"}
                    tag="button"
                >
                    Câu hỏi trong bài học
                </TETabsItem>
            </TETabs>
            <TETabsContent>
                <TETabsPane show={buttonActive === "tab1"}>
                    <Reviews />
                </TETabsPane>
                <TETabsPane show={buttonActive === "tab2"}>
                    <Questions />
                </TETabsPane>
            </TETabsContent>
        </div>
    );
}