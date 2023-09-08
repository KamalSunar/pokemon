import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getGenerationTypeList } from "../store/generations/actions";
import { RootReducerState } from "../store/rootReducer";
import Tabs from "../components/tabs";
import GenerationContent from "./generationContent";
import { GenerationListType } from "../types";
import Loader from "../components/loader";

const Generations = () => {
  const dispatch = useDispatch<any>();
  const [tabIndex, setTabIndex] = useState("I");

  const { data, loading } = useSelector(
    ({ generationReducer }: RootReducerState) => ({
      data: generationReducer.data,
      loading: generationReducer.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (data && data.length === 0) {
      dispatch(getGenerationTypeList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = data?.map((item: GenerationListType) => {
    return {
      title: item.name.replace("generation-", "").toUpperCase(),
      content: <GenerationContent tabIndex={tabIndex} />,
    };
  });

  return (
    <>
      {loading && <Loader size="lg" />}
      {!loading && (
        <Tabs
          tabs={tabs}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          hasTitle={true}
        />
      )}
    </>
  );
};

export default Generations;
