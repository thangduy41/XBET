import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
	useLayoutEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = 'XBet | Social Network';
		}
	}, [title]);
};

export default useDocumentTitle;
