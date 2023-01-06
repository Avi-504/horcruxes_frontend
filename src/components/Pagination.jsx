import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

import useStyles from "./styles.js";

const Paginate = ({ page, totalPages, handlePageChange }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (page < 1) {
    //   handlePageChange(1);
    // } else if (page > totalPages) {
    //   handlePageChange(totalPages);
    // }
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      shape="rounded"
      color="primary"
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
          classes={{ root: classes.root }}
        />
      )}
    />
  );
};

export default Paginate;
