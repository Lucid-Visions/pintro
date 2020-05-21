import React from "react";
import YearSelect from "../src/components/YearItemSelector";
import renderer from "react-test-renderer";

it('YearItemSelector renders correctly', () => {
    var year = 2000
    const callback = (value) => (
        year = value
    );

    const yearselect = renderer
      .create(
        <YearSelect>
          callback={callback}
          type={"education"}
          id={1}
          placeholder={"KCL"}
          yearValue={(new Date()).getYear()}
          yearPlaceholder={2000}
          blackTheme={true}
        </YearSelect>)
      .toJSON();
    expect(yearselect).toMatchSnapshot();
});
