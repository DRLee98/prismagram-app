import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const onChange = (text) => {
    setTerm(text);
    setShouldFetch(false);
  };
  const onSubmit = () => {
    setShouldFetch(true);
  };
  navigation.setOptions({
    headerTitle: () => <SearchBar value={term} onChange={(onChange, () => null)} onSubmit={(onSubmit, () => null)} />,
  });
  return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
};
