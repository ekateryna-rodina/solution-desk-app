import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentTerm } from "../../features/filter/filter-slice";

type AutocompleteProps = {
  data: string[];
  tabindex: string | number;
};
const Autocomplete = ({ data, tabindex }: AutocompleteProps) => {
  const {
    current: { term },
  } = useAppSelector((state) => state.filter);
  const [suggestion, setSuggestion] = useState<typeof data[number] | null>(
    null
  );
  const dispatch = useAppDispatch();
  const onInputHandler = (term) => {
    dispatch(setCurrentTerm(term));
  };
  const autocomplete = () => {
    if (!term.length) {
      setSuggestion(null);
      return;
    }
    const relevantKeys = data.filter(
      (k) =>
        k.startsWith(term) ||
        k.startsWith(term[0].toUpperCase() + term.substring(1))
    );
    if (!relevantKeys.length) {
      setSuggestion(null);
      return;
    }
    setSuggestion(relevantKeys[0]);
  };
  const handleTab = (e: any) => {
    if (suggestion && e.key === "Tab") {
      e.preventDefault();
      onInputHandler(suggestion);
      setSuggestion(null);
    }
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && term.length) {
      e.preventDefault();
    }
  };
  const confirmSuggestionHandler = (e: React.FormEvent) => {
    handleTab(e);
    handleEnter(e);
  };

  useEffect(() => {
    autocomplete();
    // eslint-disable-next-line
  }, [term]);

  return (
    <div className="relative w-32 z-100" tabIndex={+tabindex} role="tab">
      <input
        type="text"
        value={term}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onInputHandler(e.currentTarget.value)
        }
        onKeyDown={confirmSuggestionHandler}
        className="absolute border-[1px] border-blueExtend/50  focus:outline-blueExtend rounded w-full pl-2 h-8 text-sm text-slate-800 tracking-wide"
      />
      {/* virtual wrapper */}
      <div className="absolute w-auto h-8 pl-3 pointer-events-none truncate flex items-center max-w-[7.5rem]">
        {/* hidden */}
        <div className="invisible w-auto">{term}</div>
        {/* autocomplete */}
        <div
          className={`bg-transparent text-slate-400 w-auto text-sm tracking-wide ${
            Boolean(suggestion) ? "visible" : "invisible"
          }`}
          onTouchStart={confirmSuggestionHandler}
        >
          {suggestion ? suggestion.substring(term.length) : ""}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
