import React, { useEffect, useState } from "react";

type AutocompleteProps = {
  data: string[];
};
const Autocomplete = ({ data }: AutocompleteProps) => {
  const [input, setInput] = useState<string>("");
  const [suggestion, setSuggestion] = useState<typeof data[number] | null>(
    null
  );

  const autocomplete = () => {
    if (!input.length) {
      setSuggestion(null);
      return;
    }
    const relevantKeys = data.filter(
      (k) =>
        k.startsWith(input) ||
        k.startsWith(input[0].toUpperCase() + input.substring(1))
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
      setInput(suggestion);
      setSuggestion(null);
    }
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && input.length) {
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
  }, [input]);

  return (
    <div className="relative z-100 w-32">
      <input
        type="text"
        value={input}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setInput(e.currentTarget.value)
        }
        onKeyDown={confirmSuggestionHandler}
        className="absolute border-[1px] border-blueExtend/50  focus:outline-blueExtend rounded w-full pl-2 h-8 text-sm text-slate-800 tracking-wider"
      />
      {/* virtual wrapper */}
      <div className="absolute w-auto h-8 pl-2 pointer-events-none truncate flex items-center max-w-[7.5rem]">
        {/* hidden */}
        <div className="invisible w-auto">{input}</div>
        {/* autocomplete */}
        <div
          className={`bg-transparent text-slate-400 w-auto text-sm ${
            Boolean(suggestion) ? "visible" : "invisible"
          }`}
          onTouchStart={confirmSuggestionHandler}
        >
          {suggestion ? suggestion.substring(input.length) : ""}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
