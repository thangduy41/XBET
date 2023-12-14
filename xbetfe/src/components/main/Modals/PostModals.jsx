import { LoadingOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";

const EditPostModal = lazy(() => import('./EditPostModal'));
const PostLikesModal = lazy(() => import('./PostLikesModal'));
const DeletePostModal = lazy(() => import('./DeletePostModal'));


const PostModals = (props) => {
    return (
        <Suspense fallback={<LoadingOutlined className="text-gray-800 dark:text-white" />}>
            <DeletePostModal deleteSuccessCallback={props.deleteSuccessCallback} />
            <EditPostModal updateSuccessCallback={props.updateSuccessCallback} />
            <PostLikesModal />
        </Suspense>
    );
}

export default PostModals;
