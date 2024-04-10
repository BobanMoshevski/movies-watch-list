$(() => {
  $.ajax({
    type: "GET",
    url: "https://omdbapi.com/?apikey=931752b6&s=Harry&type=movie",
    dataType: "json",
    success: (movies) => {
      const sortByYear = movies.Search.sort((a, b) => b.Year - a.Year);
      $.each(sortByYear, (index, movie) => {
        moviesList("#moviesList", movie.imdbID, movie);
      });

      const checkToWatchList = JSON.parse(localStorage.getItem("toWatchList"));
      const checkWatchedList = JSON.parse(localStorage.getItem("watchedList"));
      const checkTopMoviesList = JSON.parse(
        localStorage.getItem("topMoviesList")
      );

      if (!checkToWatchList) {
        localStorage.setItem("toWatchList", JSON.stringify([]));
      } else {
        $.each(checkToWatchList, (index, movie) => {
          moviesList("#toWatchList", `toWatch${movie.imdbID}`, movie, true);
        });
      }

      if (!checkWatchedList) {
        localStorage.setItem("watchedList", JSON.stringify([]));
      } else {
        $.each(checkWatchedList, (index, movie) => {
          moviesList("#watchedList", `watched${movie.imdbID}`, movie, true);
        });
      }

      if (!checkTopMoviesList) {
        localStorage.setItem("topMoviesList", JSON.stringify([]));
      } else {
        $.each(checkTopMoviesList, (index, movie) => {
          moviesList("#topMoviesList", movie.imdbID, movie, true);
        });
      }

      $.ajax({
        type: "GET",
        url: `https://omdbapi.com/?apikey=931752b6&i=${
          $("#moviesList").children()[0].id
        }`,
        dataType: "json",
        success: (movie) => {
          const toWatchLocalStorageList = JSON.parse(
            localStorage.getItem("toWatchList")
          );
          const watchedLocalStorageList = JSON.parse(
            localStorage.getItem("watchedList")
          );
          const topMoviesLocalStorageList = JSON.parse(
            localStorage.getItem("topMoviesList")
          );

          const [checkToWatchListMovieId] = toWatchLocalStorageList.filter(
            (movieId) => movieId.imdbID === movie.imdbID
          );
          const [checkWatchedListMovieId] = watchedLocalStorageList.filter(
            (movieId) => movieId.imdbID === movie.imdbID
          );
          const [checkTopMoviesListMovieId] = topMoviesLocalStorageList.filter(
            (movieId) => movieId.imdbID === movie.imdbID
          );

          appendDescriptionChild(
            `activeDescription${$("#moviesList").children()[0].id}`,
            movie
          );

          if (checkToWatchListMovieId) {
            $("#addToWatchList").hide();
            $("#removeToWatchList").show();
          } else {
            $("#addToWatchList").show();
            $("#removeToWatchList").hide();
          }

          if (checkWatchedListMovieId) {
            $("#addWatchedList").hide();
            $("#removeWatchedList").show();
          } else {
            $("#addWatchedList").show();
            $("#removeWatchedList").hide();
          }

          if (checkTopMoviesListMovieId) {
            $("#addTopMovieList").hide();
            $("#removeTopMovieList").show();
          } else {
            $("#addTopMovieList").show();
            $("#removeTopMovieList").hide();
          }
          console.log("aaaaaaaaaaaaaaaa", $("#toWatchList li"));
          $("#addToWatchList").on("click", () => {
            console.log("addd");
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("toWatchList")
            );
            const newMovie = {
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Type: movie.Type,
              Poster: movie.Poster,
            };
            getListLocalStorage.push(newMovie);
            moviesList("#toWatchList", `toWatch${newMovie.imdbID}`, newMovie);

            localStorage.setItem(
              "toWatchList",
              JSON.stringify(getListLocalStorage)
            );

            $("#addToWatchList").hide();
            $("#removeToWatchList").show();
          });

          $("#removeToWatchList").on("click", () => {
            console.log("removeee");
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("toWatchList")
            );
            const removeMovieFromList = getListLocalStorage.filter(
              (movieId) => movieId.imdbID !== movie.imdbID
            );
            localStorage.setItem(
              "toWatchList",
              JSON.stringify(removeMovieFromList)
            );
            $("#toWatchList").children().detach();
            $.each(removeMovieFromList, (i, movie) => {
              moviesList("#toWatchList", `toWatch${movie.imdbID}`, movie, true);
            });

            $("#addToWatchList").show();
            $("#removeToWatchList").hide();
          });

          $("#addWatchedList").on("click", () => {
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("watchedList")
            );
            const newMovie = {
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Type: movie.Type,
              Poster: movie.Poster,
            };
            getListLocalStorage.push(newMovie);
            moviesList(
              "#watchedList",
              `watched${newMovie.imdbID}`,
              movie,
              true
            );

            localStorage.setItem(
              "watchedList",
              JSON.stringify(getListLocalStorage)
            );

            $("#addWatchedList").hide();
            $("#removeWatchedList").show();
          });

          $("#removeWatchedList").on("click", () => {
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("watchedList")
            );
            const removeMovieFromList = getListLocalStorage.filter(
              (movieId) => movieId.imdbID !== movie.imdbID
            );
            localStorage.setItem(
              "watchedList",
              JSON.stringify(removeMovieFromList)
            );
            $("#watchedList").children().detach();
            $.each(removeMovieFromList, (i, movie) => {
              moviesList("#watchedList", `watched${movie.imdbID}`, movie, true);
            });

            $("#addWatchedList").show();
            $("#removeWatchedList").hide();
          });

          $("#addTopMovieList").on("click", () => {
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("topMoviesList")
            );
            const newMovie = {
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Type: movie.Type,
              Poster: movie.Poster,
            };
            getListLocalStorage.push(newMovie);
            moviesList(
              "#topMoviesList",
              `topMovies${newMovie.imdbID}`,
              movie,
              true
            );

            localStorage.setItem(
              "topMoviesList",
              JSON.stringify(getListLocalStorage)
            );

            $("#addTopMovieList").hide();
            $("#removeTopMovieList").show();
          });

          $("#removeTopMovieList").on("click", () => {
            const getListLocalStorage = JSON.parse(
              localStorage.getItem("topMoviesList")
            );
            const removeMovieFromList = getListLocalStorage.filter(
              (movieId) => movieId.imdbID !== movie.imdbID
            );
            localStorage.setItem(
              "topMoviesList",
              JSON.stringify(removeMovieFromList)
            );
            $("#topMoviesList").children().detach();
            $.each(removeMovieFromList, (i, movie) => {
              moviesList(
                "#topMoviesList",
                `topMovies${movie.imdbID}`,
                movie,
                true
              );
            });

            $("#addTopMovieList").show();
            $("#removeTopMovieList").hide();
          });
        },
        complete: () => hideLoader(),
      });

      $("#moviesList li").on("click", (event) => {
        const checkActiveDescription = $(
          `#activeDescription${event.currentTarget.id}`
        ).attr("id");
        const a = checkActiveDescription;
        const b = `activeDescription${event.currentTarget.id}`;

        if (a === b) {
          return;
        }
        showLoader();
        $("#descriptionLayout").children().detach();
        $.ajax({
          type: "GET",
          url: `https://omdbapi.com/?apikey=931752b6&i=${event.currentTarget.id}`,
          dataType: "json",
          success: (movie) => {
            const toWatchLocalStorageList = JSON.parse(
              localStorage.getItem("toWatchList")
            );
            const watchedLocalStorageList = JSON.parse(
              localStorage.getItem("watchedList")
            );
            const topMoviesLocalStorageList = JSON.parse(
              localStorage.getItem("topMoviesList")
            );

            const [checkToWatchListMovieId] = toWatchLocalStorageList.filter(
              (movieId) => movieId.imdbID === movie.imdbID
            );
            const [checkWatchedListMovieId] = watchedLocalStorageList.filter(
              (movieId) => movieId.imdbID === movie.imdbID
            );
            const [checkTopMoviesListMovieId] =
              topMoviesLocalStorageList.filter(
                (movieId) => movieId.imdbID === movie.imdbID
              );

            appendDescriptionChild(b, movie);

            if (checkToWatchListMovieId) {
              $("#addToWatchList").hide();
              $("#removeToWatchList").show();
            } else {
              $("#addToWatchList").show();
              $("#removeToWatchList").hide();
            }

            if (checkWatchedListMovieId) {
              $("#addWatchedList").hide();
              $("#removeWatchedList").show();
            } else {
              $("#addWatchedList").show();
              $("#removeWatchedList").hide();
            }

            if (checkTopMoviesListMovieId) {
              $("#addTopMovieList").hide();
              $("#removeTopMovieList").show();
            } else {
              $("#addTopMovieList").show();
              $("#removeTopMovieList").hide();
            }

            $("#addToWatchList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("toWatchList")
              );
              const newMovie = {
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type,
                Poster: movie.Poster,
              };
              getListLocalStorage.push(newMovie);
              moviesList(
                "#toWatchList",
                `toWatch${newMovie.imdbID}`,
                movie,
                true
              );

              localStorage.setItem(
                "toWatchList",
                JSON.stringify(getListLocalStorage)
              );

              $("#addToWatchList").hide();
              $("#removeToWatchList").show();
            });

            $("#removeToWatchList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("toWatchList")
              );
              const removeMovieFromList = getListLocalStorage.filter(
                (movieId) => movieId.imdbID !== movie.imdbID
              );
              localStorage.setItem(
                "toWatchList",
                JSON.stringify(removeMovieFromList)
              );
              $("#toWatchList").children().detach();
              $.each(removeMovieFromList, (i, movie) => {
                moviesList(
                  "#toWatchList",
                  `toWatch${movie.imdbID}`,
                  movie,
                  true
                );
              });

              $("#addToWatchList").show();
              $("#removeToWatchList").hide();
            });

            $("#addWatchedList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("watchedList")
              );
              const newMovie = {
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type,
                Poster: movie.Poster,
              };
              getListLocalStorage.push(newMovie);
              moviesList(
                "#watchedList",
                `watched${newMovie.imdbID}`,
                movie,
                true
              );

              localStorage.setItem(
                "watchedList",
                JSON.stringify(getListLocalStorage)
              );

              $("#addWatchedList").hide();
              $("#removeWatchedList").show();
            });

            $("#removeWatchedList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("watchedList")
              );
              const removeMovieFromList = getListLocalStorage.filter(
                (movieId) => movieId.imdbID !== movie.imdbID
              );
              localStorage.setItem(
                "watchedList",
                JSON.stringify(removeMovieFromList)
              );
              $("#watchedList").children().detach();
              $.each(removeMovieFromList, (i, movie) => {
                moviesList(
                  "#watchedList",
                  `watched${movie.imdbID}`,
                  movie,
                  true
                );
              });

              $("#addWatchedList").show();
              $("#removeWatchedList").hide();
            });

            $("#addTopMovieList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("topMoviesList")
              );
              const newMovie = {
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type,
                Poster: movie.Poster,
              };
              getListLocalStorage.push(newMovie);
              moviesList(
                "#topMoviesList",
                `topMovies${newMovie.imdbID}`,
                movie,
                true
              );

              localStorage.setItem(
                "topMoviesList",
                JSON.stringify(getListLocalStorage)
              );

              $("#addTopMovieList").hide();
              $("#removeTopMovieList").show();
            });

            $("#removeTopMovieList").on("click", () => {
              const getListLocalStorage = JSON.parse(
                localStorage.getItem("topMoviesList")
              );
              const removeMovieFromList = getListLocalStorage.filter(
                (movieId) => movieId.imdbID !== movie.imdbID
              );
              localStorage.setItem(
                "topMoviesList",
                JSON.stringify(removeMovieFromList)
              );
              $("#topMoviesList").children().detach();
              $.each(removeMovieFromList, (i, movie) => {
                moviesList(
                  "#topMoviesList",
                  `topMovies${movie.imdbID}`,
                  movie,
                  true
                );
              });

              $("#addTopMovieList").show();
              $("#removeTopMovieList").hide();
            });
          },
          complete: () => hideLoader(),
        });
      });

      $("#searchMovieName").on("keyup", () => {
        const inputValue = $("#searchMovieName").val();
        const capitalLetter =
          inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        if (capitalLetter.length > 2) {
          showLoader();
          $.ajax({
            type: "GET",
            url: `https://omdbapi.com/?apikey=931752b6&s=${capitalLetter}&type=movie`,
            dataType: "json",
            success: (movies) => {
              $("#moviesList").hide();
              $("#searchMoviesList").show();
              $("#searchMoviesList").children().detach();
              $.each(movies.Search, (index, movie) => {
                moviesList("#searchMoviesList", movie.imdbID, movie, false);
              });
              $("#searchMoviesList li").on("click", (event) => {
                const checkActiveDescription = $(
                  `#activeDescription${event.currentTarget.id}`
                ).attr("id");
                const a = checkActiveDescription;
                const b = `activeDescription${event.currentTarget.id}`;

                if (a === b) {
                  return;
                }

                showLoader();
                $.ajax({
                  type: "GET",
                  url: `https://omdbapi.com/?apikey=931752b6&i=${event.currentTarget.id}`,
                  dataType: "json",
                  success: (movie) => {
                    const toWatchLocalStorageList = JSON.parse(
                      localStorage.getItem("toWatchList")
                    );
                    const watchedLocalStorageList = JSON.parse(
                      localStorage.getItem("watchedList")
                    );
                    const topMoviesLocalStorageList = JSON.parse(
                      localStorage.getItem("topMoviesList")
                    );

                    const [checkToWatchListMovieId] =
                      toWatchLocalStorageList.filter(
                        (movieId) => movieId.imdbID === movie.imdbID
                      );
                    const [checkWatchedListMovieId] =
                      watchedLocalStorageList.filter(
                        (movieId) => movieId.imdbID === movie.imdbID
                      );
                    const [checkTopMoviesListMovieId] =
                      topMoviesLocalStorageList.filter(
                        (movieId) => movieId.imdbID === movie.imdbID
                      );

                    console.log("renderiranje", event.currentTarget.id);
                    console.log("a", a);
                    console.log("b", b);

                    if (a !== b) {
                      console.log("ifif");
                      $("#descriptionLayout").children().detach();
                      appendDescriptionChild(b, movie);

                      if (checkToWatchListMovieId) {
                        $("#addToWatchList").hide();
                        $("#removeToWatchList").show();
                      } else {
                        $("#addToWatchList").show();
                        $("#removeToWatchList").hide();
                      }

                      if (checkWatchedListMovieId) {
                        $("#addWatchedList").hide();
                        $("#removeWatchedList").show();
                      } else {
                        $("#addWatchedList").show();
                        $("#removeWatchedList").hide();
                      }

                      if (checkTopMoviesListMovieId) {
                        $("#addTopMovieList").hide();
                        $("#removeTopMovieList").show();
                      } else {
                        $("#addTopMovieList").show();
                        $("#removeTopMovieList").hide();
                      }

                      $("#addToWatchList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("toWatchList")
                        );
                        const newMovie = {
                          Title: movie.Title,
                          Year: movie.Year,
                          imdbID: movie.imdbID,
                          Type: movie.Type,
                          Poster: movie.Poster,
                        };
                        getListLocalStorage.push(newMovie);
                        moviesList(
                          "#toWatchList",
                          `toWatch${newMovie.imdbID}`,
                          movie,
                          true
                        );

                        localStorage.setItem(
                          "toWatchList",
                          JSON.stringify(getListLocalStorage)
                        );

                        $("#addToWatchList").hide();
                        $("#removeToWatchList").show();
                      });

                      $("#removeToWatchList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("toWatchList")
                        );
                        const removeMovieFromList = getListLocalStorage.filter(
                          (movieId) => movieId.imdbID !== movie.imdbID
                        );
                        localStorage.setItem(
                          "toWatchList",
                          JSON.stringify(removeMovieFromList)
                        );
                        $("#toWatchList").children().detach();
                        $.each(removeMovieFromList, (i, movie) => {
                          if (i < 1) {
                            moviesList(
                              "#toWatchList",
                              `toWatch${movie.imdbID}`,
                              movie,
                              true
                            );
                          }
                        });

                        $("#addToWatchList").show();
                        $("#removeToWatchList").hide();
                      });

                      $("#addWatchedList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("watchedList")
                        );
                        const newMovie = {
                          Title: movie.Title,
                          Year: movie.Year,
                          imdbID: movie.imdbID,
                          Type: movie.Type,
                          Poster: movie.Poster,
                        };
                        getListLocalStorage.push(newMovie);
                        moviesList(
                          "#watchedList",
                          `watched${newMovie.imdbID}`,
                          movie,
                          true
                        );

                        localStorage.setItem(
                          "watchedList",
                          JSON.stringify(getListLocalStorage)
                        );

                        $("#addWatchedList").hide();
                        $("#removeWatchedList").show();
                      });

                      $("#removeWatchedList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("watchedList")
                        );
                        const removeMovieFromList = getListLocalStorage.filter(
                          (movieId) => movieId.imdbID !== movie.imdbID
                        );
                        localStorage.setItem(
                          "watchedList",
                          JSON.stringify(removeMovieFromList)
                        );
                        $("#watchedList").children().detach();
                        $.each(removeMovieFromList, (i, movie) => {
                          if (i < 1) {
                            moviesList(
                              "#watchedList",
                              `watched${movie.imdbID}`,
                              movie,
                              true
                            );
                          }
                        });

                        $("#addWatchedList").show();
                        $("#removeWatchedList").hide();
                      });

                      $("#addTopMovieList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("topMoviesList")
                        );
                        const newMovie = {
                          Title: movie.Title,
                          Year: movie.Year,
                          imdbID: movie.imdbID,
                          Type: movie.Type,
                          Poster: movie.Poster,
                        };
                        getListLocalStorage.push(newMovie);
                        moviesList(
                          "#topMoviesList",
                          `topMovies${newMovie.imdbID}`,
                          movie,
                          true
                        );

                        localStorage.setItem(
                          "topMoviesList",
                          JSON.stringify(getListLocalStorage)
                        );

                        $("#addTopMovieList").hide();
                        $("#removeTopMovieList").show();
                      });

                      $("#removeTopMovieList").on("click", () => {
                        const getListLocalStorage = JSON.parse(
                          localStorage.getItem("topMoviesList")
                        );
                        const removeMovieFromList = getListLocalStorage.filter(
                          (movieId) => movieId.imdbID !== movie.imdbID
                        );
                        localStorage.setItem(
                          "topMoviesList",
                          JSON.stringify(removeMovieFromList)
                        );
                        $("#topMoviesList").children().detach();
                        $.each(removeMovieFromList, (i, movie) => {
                          if (i < 1) {
                            moviesList(
                              "#topMoviesList",
                              `topMovies${movie.imdbID}`,
                              movie,
                              true
                            );
                          }
                        });

                        $("#addTopMovieList").show();
                        $("#removeTopMovieList").hide();
                      });
                    }
                  },
                  complete: () => hideLoader(),
                });
              });
            },
            complete: () => hideLoader(),
          });
        } else {
          $("#moviesList").show();
          $("#searchMoviesList").hide();
        }

        $("#watchedList li").on("click", (e) => {
          console.log("click", e.currentTarget.id.split("toWatch"));
          const movieId = e.currentTarget.id.split("watched")[1];
          const checkDescription = $(`#activeDescription${movieId}`).attr("id");
          console.log(checkDescription);

          if (checkDescription) {
            return;
          }

          if (!checkDescription) {
            showLoader();
            $("#descriptionLayout").children().detach();
            $.ajax({
              type: "GET",
              url: `https://omdbapi.com/?apikey=931752b6&i=${movieId}`,
              dataType: "json",
              success: (movie) => {
                const toWatchLocalStorageList = JSON.parse(
                  localStorage.getItem("toWatchList")
                );
                const watchedLocalStorageList = JSON.parse(
                  localStorage.getItem("watchedList")
                );
                const topMoviesLocalStorageList = JSON.parse(
                  localStorage.getItem("topMoviesList")
                );

                const [checkToWatchListMovieId] =
                  toWatchLocalStorageList.filter(
                    (movieId) => movieId.imdbID === movie.imdbID
                  );
                const [checkWatchedListMovieId] =
                  watchedLocalStorageList.filter(
                    (movieId) => movieId.imdbID === movie.imdbID
                  );
                const [checkTopMoviesListMovieId] =
                  topMoviesLocalStorageList.filter(
                    (movieId) => movieId.imdbID === movie.imdbID
                  );

                appendDescriptionChild(`activeDescription${movieId}`, movie);

                if (checkToWatchListMovieId) {
                  $("#addToWatchList").hide();
                  $("#removeToWatchList").show();
                } else {
                  $("#addToWatchList").show();
                  $("#removeToWatchList").hide();
                }

                if (checkWatchedListMovieId) {
                  $("#addWatchedList").hide();
                  $("#removeWatchedList").show();
                } else {
                  $("#addWatchedList").show();
                  $("#removeWatchedList").hide();
                }

                if (checkTopMoviesListMovieId) {
                  $("#addTopMovieList").hide();
                  $("#removeTopMovieList").show();
                } else {
                  $("#addTopMovieList").show();
                  $("#removeTopMovieList").hide();
                }

                $("#addToWatchList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("toWatchList")
                  );
                  const newMovie = {
                    Title: movie.Title,
                    Year: movie.Year,
                    imdbID: movie.imdbID,
                    Type: movie.Type,
                    Poster: movie.Poster,
                  };
                  getListLocalStorage.push(newMovie);
                  moviesList(
                    "#toWatchList",
                    `toWatch${newMovie.imdbID}`,
                    movie,
                    true
                  );

                  localStorage.setItem(
                    "toWatchList",
                    JSON.stringify(getListLocalStorage)
                  );

                  $("#addToWatchList").hide();
                  $("#removeToWatchList").show();
                });

                $("#removeToWatchList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("toWatchList")
                  );
                  const removeMovieFromList = getListLocalStorage.filter(
                    (movieId) => movieId.imdbID !== movie.imdbID
                  );
                  localStorage.setItem(
                    "toWatchList",
                    JSON.stringify(removeMovieFromList)
                  );
                  $("#toWatchList").children().detach();
                  $.each(removeMovieFromList, (i, movie) => {
                    moviesList(
                      "#toWatchList",
                      `toWatch${movie.imdbID}`,
                      movie,
                      true
                    );
                  });

                  $("#addToWatchList").show();
                  $("#removeToWatchList").hide();
                });

                $("#addWatchedList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("watchedList")
                  );
                  const newMovie = {
                    Title: movie.Title,
                    Year: movie.Year,
                    imdbID: movie.imdbID,
                    Type: movie.Type,
                    Poster: movie.Poster,
                  };
                  getListLocalStorage.push(newMovie);
                  moviesList(
                    "#watchedList",
                    `watched${newMovie.imdbID}`,
                    movie,
                    true
                  );

                  localStorage.setItem(
                    "watchedList",
                    JSON.stringify(getListLocalStorage)
                  );

                  $("#addWatchedList").hide();
                  $("#removeWatchedList").show();
                });

                $("#removeWatchedList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("watchedList")
                  );
                  const removeMovieFromList = getListLocalStorage.filter(
                    (movieId) => movieId.imdbID !== movie.imdbID
                  );
                  localStorage.setItem(
                    "watchedList",
                    JSON.stringify(removeMovieFromList)
                  );
                  $("#watchedList").children().detach();
                  $.each(removeMovieFromList, (i, movie) => {
                    moviesList(
                      "#watchedList",
                      `watched${movie.imdbID}`,
                      movie,
                      true
                    );
                  });

                  $("#addWatchedList").show();
                  $("#removeWatchedList").hide();
                });

                $("#addTopMovieList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("topMoviesList")
                  );
                  const newMovie = {
                    Title: movie.Title,
                    Year: movie.Year,
                    imdbID: movie.imdbID,
                    Type: movie.Type,
                    Poster: movie.Poster,
                  };
                  getListLocalStorage.push(newMovie);
                  moviesList(
                    "#topMoviesList",
                    `topMovies${newMovie.imdbID}`,
                    movie,
                    true
                  );

                  localStorage.setItem(
                    "topMoviesList",
                    JSON.stringify(getListLocalStorage)
                  );

                  $("#addTopMovieList").hide();
                  $("#removeTopMovieList").show();
                });

                $("#removeTopMovieList").on("click", () => {
                  const getListLocalStorage = JSON.parse(
                    localStorage.getItem("topMoviesList")
                  );
                  const removeMovieFromList = getListLocalStorage.filter(
                    (movieId) => movieId.imdbID !== movie.imdbID
                  );
                  localStorage.setItem(
                    "topMoviesList",
                    JSON.stringify(removeMovieFromList)
                  );
                  $("#topMoviesList").children().detach();
                  $.each(removeMovieFromList, (i, movie) => {
                    moviesList(
                      "#topMoviesList",
                      `topMovies${movie.imdbID}`,
                      movie,
                      true
                    );
                  });

                  $("#addTopMovieList").show();
                  $("#removeTopMovieList").hide();
                });
              },
              complete: () => hideLoader(),
            });
          }
        });
      });

      $("#toWatchList li").on("click", (e) => {
        console.log("click", e.currentTarget.id.split("toWatch"));
        const movieId = e.currentTarget.id.split("toWatch")[1];
        const checkDescription = $(`#activeDescription${movieId}`).attr("id");
        console.log(checkDescription);

        if (checkDescription) {
          return;
        }

        if (!checkDescription) {
          showLoader();
          $("#descriptionLayout").children().detach();
          $.ajax({
            type: "GET",
            url: `https://omdbapi.com/?apikey=931752b6&i=${movieId}`,
            dataType: "json",
            success: (movie) => {
              const toWatchLocalStorageList = JSON.parse(
                localStorage.getItem("toWatchList")
              );
              const watchedLocalStorageList = JSON.parse(
                localStorage.getItem("watchedList")
              );
              const topMoviesLocalStorageList = JSON.parse(
                localStorage.getItem("topMoviesList")
              );

              const [checkToWatchListMovieId] = toWatchLocalStorageList.filter(
                (movieId) => movieId.imdbID === movie.imdbID
              );
              const [checkWatchedListMovieId] = watchedLocalStorageList.filter(
                (movieId) => movieId.imdbID === movie.imdbID
              );
              const [checkTopMoviesListMovieId] =
                topMoviesLocalStorageList.filter(
                  (movieId) => movieId.imdbID === movie.imdbID
                );

              appendDescriptionChild(`activeDescription${movieId}`, movie);

              if (checkToWatchListMovieId) {
                $("#addToWatchList").hide();
                $("#removeToWatchList").show();
              } else {
                $("#addToWatchList").show();
                $("#removeToWatchList").hide();
              }

              if (checkWatchedListMovieId) {
                $("#addWatchedList").hide();
                $("#removeWatchedList").show();
              } else {
                $("#addWatchedList").show();
                $("#removeWatchedList").hide();
              }

              if (checkTopMoviesListMovieId) {
                $("#addTopMovieList").hide();
                $("#removeTopMovieList").show();
              } else {
                $("#addTopMovieList").show();
                $("#removeTopMovieList").hide();
              }

              $("#addToWatchList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("toWatchList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#toWatchList",
                  `toWatch${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "toWatchList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addToWatchList").hide();
                $("#removeToWatchList").show();
                $("#watchedList li").on("click", (e) => {
                  console.log("click", e.currentTarget.id.split("toWatch"));
                  const movieId = e.currentTarget.id.split("watched")[1];
                  const checkDescription = $(
                    `#activeDescription${movieId}`
                  ).attr("id");
                  console.log(checkDescription);

                  if (checkDescription) {
                    return;
                  }

                  if (!checkDescription) {
                    showLoader();
                    $("#descriptionLayout").children().detach();
                    $.ajax({
                      type: "GET",
                      url: `https://omdbapi.com/?apikey=931752b6&i=${movieId}`,
                      dataType: "json",
                      success: (movie) => {
                        const toWatchLocalStorageList = JSON.parse(
                          localStorage.getItem("toWatchList")
                        );
                        const watchedLocalStorageList = JSON.parse(
                          localStorage.getItem("watchedList")
                        );
                        const topMoviesLocalStorageList = JSON.parse(
                          localStorage.getItem("topMoviesList")
                        );

                        const [checkToWatchListMovieId] =
                          toWatchLocalStorageList.filter(
                            (movieId) => movieId.imdbID === movie.imdbID
                          );
                        const [checkWatchedListMovieId] =
                          watchedLocalStorageList.filter(
                            (movieId) => movieId.imdbID === movie.imdbID
                          );
                        const [checkTopMoviesListMovieId] =
                          topMoviesLocalStorageList.filter(
                            (movieId) => movieId.imdbID === movie.imdbID
                          );

                        appendDescriptionChild(
                          `activeDescription${movieId}`,
                          movie
                        );

                        if (checkToWatchListMovieId) {
                          $("#addToWatchList").hide();
                          $("#removeToWatchList").show();
                        } else {
                          $("#addToWatchList").show();
                          $("#removeToWatchList").hide();
                        }

                        if (checkWatchedListMovieId) {
                          $("#addWatchedList").hide();
                          $("#removeWatchedList").show();
                        } else {
                          $("#addWatchedList").show();
                          $("#removeWatchedList").hide();
                        }

                        if (checkTopMoviesListMovieId) {
                          $("#addTopMovieList").hide();
                          $("#removeTopMovieList").show();
                        } else {
                          $("#addTopMovieList").show();
                          $("#removeTopMovieList").hide();
                        }

                        $("#addToWatchList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("toWatchList")
                          );
                          const newMovie = {
                            Title: movie.Title,
                            Year: movie.Year,
                            imdbID: movie.imdbID,
                            Type: movie.Type,
                            Poster: movie.Poster,
                          };
                          getListLocalStorage.push(newMovie);
                          moviesList(
                            "#toWatchList",
                            `toWatch${newMovie.imdbID}`,
                            movie,
                            true
                          );

                          localStorage.setItem(
                            "toWatchList",
                            JSON.stringify(getListLocalStorage)
                          );

                          $("#addToWatchList").hide();
                          $("#removeToWatchList").show();
                        });

                        $("#removeToWatchList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("toWatchList")
                          );
                          const removeMovieFromList =
                            getListLocalStorage.filter(
                              (movieId) => movieId.imdbID !== movie.imdbID
                            );
                          localStorage.setItem(
                            "toWatchList",
                            JSON.stringify(removeMovieFromList)
                          );
                          $("#toWatchList").children().detach();
                          $.each(removeMovieFromList, (i, movie) => {
                            moviesList(
                              "#toWatchList",
                              `toWatch${movie.imdbID}`,
                              movie,
                              true
                            );
                          });

                          $("#addToWatchList").show();
                          $("#removeToWatchList").hide();
                        });

                        $("#addWatchedList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("watchedList")
                          );
                          const newMovie = {
                            Title: movie.Title,
                            Year: movie.Year,
                            imdbID: movie.imdbID,
                            Type: movie.Type,
                            Poster: movie.Poster,
                          };
                          getListLocalStorage.push(newMovie);
                          moviesList(
                            "#watchedList",
                            `watched${newMovie.imdbID}`,
                            movie,
                            true
                          );

                          localStorage.setItem(
                            "watchedList",
                            JSON.stringify(getListLocalStorage)
                          );

                          $("#addWatchedList").hide();
                          $("#removeWatchedList").show();
                        });

                        $("#removeWatchedList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("watchedList")
                          );
                          const removeMovieFromList =
                            getListLocalStorage.filter(
                              (movieId) => movieId.imdbID !== movie.imdbID
                            );
                          localStorage.setItem(
                            "watchedList",
                            JSON.stringify(removeMovieFromList)
                          );
                          $("#watchedList").children().detach();
                          $.each(removeMovieFromList, (i, movie) => {
                            moviesList(
                              "#watchedList",
                              `watched${movie.imdbID}`,
                              movie,
                              true
                            );
                          });

                          $("#addWatchedList").show();
                          $("#removeWatchedList").hide();
                        });

                        $("#addTopMovieList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("topMoviesList")
                          );
                          const newMovie = {
                            Title: movie.Title,
                            Year: movie.Year,
                            imdbID: movie.imdbID,
                            Type: movie.Type,
                            Poster: movie.Poster,
                          };
                          getListLocalStorage.push(newMovie);
                          moviesList(
                            "#topMoviesList",
                            `topMovies${newMovie.imdbID}`,
                            movie,
                            true
                          );

                          localStorage.setItem(
                            "topMoviesList",
                            JSON.stringify(getListLocalStorage)
                          );

                          $("#addTopMovieList").hide();
                          $("#removeTopMovieList").show();
                        });

                        $("#removeTopMovieList").on("click", () => {
                          const getListLocalStorage = JSON.parse(
                            localStorage.getItem("topMoviesList")
                          );
                          const removeMovieFromList =
                            getListLocalStorage.filter(
                              (movieId) => movieId.imdbID !== movie.imdbID
                            );
                          localStorage.setItem(
                            "topMoviesList",
                            JSON.stringify(removeMovieFromList)
                          );
                          $("#topMoviesList").children().detach();
                          $.each(removeMovieFromList, (i, movie) => {
                            moviesList(
                              "#topMoviesList",
                              `topMovies${movie.imdbID}`,
                              movie,
                              true
                            );
                          });

                          $("#addTopMovieList").show();
                          $("#removeTopMovieList").hide();
                        });
                      },
                      complete: () => hideLoader(),
                    });
                  }
                });
              });

              $("#removeToWatchList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("toWatchList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "toWatchList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#toWatchList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#toWatchList",
                    `toWatch${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addToWatchList").show();
                $("#removeToWatchList").hide();
              });

              $("#addWatchedList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("watchedList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#watchedList",
                  `watched${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "watchedList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addWatchedList").hide();
                $("#removeWatchedList").show();
              });

              $("#removeWatchedList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("watchedList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "watchedList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#watchedList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#watchedList",
                    `watched${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addWatchedList").show();
                $("#removeWatchedList").hide();
              });

              $("#addTopMovieList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("topMoviesList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#topMoviesList",
                  `topMovies${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "topMoviesList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addTopMovieList").hide();
                $("#removeTopMovieList").show();
              });

              $("#removeTopMovieList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("topMoviesList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "topMoviesList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#topMoviesList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#topMoviesList",
                    `topMovies${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addTopMovieList").show();
                $("#removeTopMovieList").hide();
              });
            },
            complete: () => hideLoader(),
          });
        }
      });

      $("#watchedList li").on("click", (e) => {
        console.log("click", e.currentTarget.id.split("toWatch"));
        const movieId = e.currentTarget.id.split("watched")[1];
        const checkDescription = $(`#activeDescription${movieId}`).attr("id");
        console.log(checkDescription);

        if (checkDescription) {
          return;
        }

        if (!checkDescription) {
          showLoader();
          $("#descriptionLayout").children().detach();
          $.ajax({
            type: "GET",
            url: `https://omdbapi.com/?apikey=931752b6&i=${movieId}`,
            dataType: "json",
            success: (movie) => {
              const toWatchLocalStorageList = JSON.parse(
                localStorage.getItem("toWatchList")
              );
              const watchedLocalStorageList = JSON.parse(
                localStorage.getItem("watchedList")
              );
              const topMoviesLocalStorageList = JSON.parse(
                localStorage.getItem("topMoviesList")
              );

              const [checkToWatchListMovieId] = toWatchLocalStorageList.filter(
                (movieId) => movieId.imdbID === movie.imdbID
              );
              const [checkWatchedListMovieId] = watchedLocalStorageList.filter(
                (movieId) => movieId.imdbID === movie.imdbID
              );
              const [checkTopMoviesListMovieId] =
                topMoviesLocalStorageList.filter(
                  (movieId) => movieId.imdbID === movie.imdbID
                );

              appendDescriptionChild(`activeDescription${movieId}`, movie);

              if (checkToWatchListMovieId) {
                $("#addToWatchList").hide();
                $("#removeToWatchList").show();
              } else {
                $("#addToWatchList").show();
                $("#removeToWatchList").hide();
              }

              if (checkWatchedListMovieId) {
                $("#addWatchedList").hide();
                $("#removeWatchedList").show();
              } else {
                $("#addWatchedList").show();
                $("#removeWatchedList").hide();
              }

              if (checkTopMoviesListMovieId) {
                $("#addTopMovieList").hide();
                $("#removeTopMovieList").show();
              } else {
                $("#addTopMovieList").show();
                $("#removeTopMovieList").hide();
              }

              $("#addToWatchList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("toWatchList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#toWatchList",
                  `toWatch${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "toWatchList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addToWatchList").hide();
                $("#removeToWatchList").show();
              });

              $("#removeToWatchList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("toWatchList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "toWatchList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#toWatchList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#toWatchList",
                    `toWatch${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addToWatchList").show();
                $("#removeToWatchList").hide();
              });

              $("#addWatchedList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("watchedList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#watchedList",
                  `watched${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "watchedList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addWatchedList").hide();
                $("#removeWatchedList").show();
              });

              $("#removeWatchedList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("watchedList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "watchedList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#watchedList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#watchedList",
                    `watched${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addWatchedList").show();
                $("#removeWatchedList").hide();
              });

              $("#addTopMovieList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("topMoviesList")
                );
                const newMovie = {
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                };
                getListLocalStorage.push(newMovie);
                moviesList(
                  "#topMoviesList",
                  `topMovies${newMovie.imdbID}`,
                  movie,
                  true
                );

                localStorage.setItem(
                  "topMoviesList",
                  JSON.stringify(getListLocalStorage)
                );

                $("#addTopMovieList").hide();
                $("#removeTopMovieList").show();
              });

              $("#removeTopMovieList").on("click", () => {
                const getListLocalStorage = JSON.parse(
                  localStorage.getItem("topMoviesList")
                );
                const removeMovieFromList = getListLocalStorage.filter(
                  (movieId) => movieId.imdbID !== movie.imdbID
                );
                localStorage.setItem(
                  "topMoviesList",
                  JSON.stringify(removeMovieFromList)
                );
                $("#topMoviesList").children().detach();
                $.each(removeMovieFromList, (i, movie) => {
                  moviesList(
                    "#topMoviesList",
                    `topMovies${movie.imdbID}`,
                    movie,
                    true
                  );
                });

                $("#addTopMovieList").show();
                $("#removeTopMovieList").hide();
              });
            },
            complete: () => hideLoader(),
          });
        }
      });
    },
    complete: () => hideLoader(),
  });
});

// Function to show loader and block interactions
function showLoader() {
  $("#loader").show();
  $("#overlay").show();
}

// Function to hide loader and unblock interactions
function hideLoader() {
  $("#loader").hide();
  $("#overlay").hide();
}

function moviesList(WrapperList, movieId, movie, modal = false) {
  $(WrapperList).append(`
    <li 
      id="${movieId}"
      class="d-flex hover-effect border border-dark rounded p-2 my-3 gap-3"
      ${modal && "data-bs-dismiss='modal'"}
      ${modal && "aria-label='Close'"}
    >
      <img
        class="movie-image rounded"
        src=${movie.Poster}
        alt="Movie image"
      />
      <div class="flex-column w-100">
        <h2 class="text-center">${movie.Title}</h2>
        <div  class="d-flex justify-content-around w-100">
         <p id="year">Year: ${movie.Year}</p>
         <p id="type">Type: ${movie.Type}</p>
       </div>
      </div>
    </li>
  `);
}

function appendDescriptionChild(childId, movie) {
  $("#descriptionLayout").append(
    `
      <div 
        id=${childId} 
        class="movie-description-layout shadow-lg p-4 mb-5 rounded"
      >
      <img
        class="movie-description-layout-image rounded mt-3"
        src=${movie.Poster}
        alt="Movie image"
      />
      <h2 class="text-center py-4">
        Title: ${movie.Title}
      </h2>
      <div
        id="decsription1"
        class="d-flex justify-content-around w-100 border border-dark rounded p-2 gap-5"
      >
        <p class="border-end border-dark">Released: ${movie.Released}</p>
        <p class="border-end border-dark">Genre: ${movie.Genre}</p>
        <p class="border-end border-dark">Runtime: ${movie.Runtime}</p>
        <p>imdbRating: ${movie.imdbRating}</p>
      </div>
      <div
        id="decsription2"
        class="d-flex justify-content-around w-100 p-2 gap-5"
      >
        <h3 class="border-end border-dark">Director: ${movie.Director}</h3>
        <h3 class="border-end border-dark">Writer: ${movie.Writer}</h3>
        <h3>Actors: ${movie.Actors}</h3>
      </div>
      <div
        id="decsription3"
        class="d-flex justify-content-around w-100 border border-dark rounded p-2 gap-5"
      >
        <p class="border-end border-dark">Language: ${movie.Language}</p>
        <p class="border-end border-dark">Country: ${movie.Country}</p>
        <p>Awards: ${movie.Awards}</p>
      </div>
      <p class="border-bottom border-dark w-100 text-center py-2">
        Description: ${movie.Plot}
      </p>
      <div
        id="decsription4"
        class="d-flex justify-content-around align-items-center flex-wrap gap-3 w-100 p-4 gap-5"
      >
        <button id="addToWatchList" class="btn btn-dark">Add to watch list</button>
        <button id="removeToWatchList" class="btn btn-dark">Remove to watch list</button>
        <button id="addWatchedList" class="btn btn-dark">Add watched list</button>
        <button id="removeWatchedList" class="btn btn-dark">Remove watched list</button>
        <button id="addTopMovieList" class="btn btn-dark">Add to top movies list</button>
        <button id="removeTopMovieList" class="btn btn-dark">Remove to top movies list</button>
      </div>
    </div>
  `
  );
}
