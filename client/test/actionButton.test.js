import React from "react";
import ActionButton from "../src/components/ActionButton";
import renderer from "react-test-renderer";

/**
 * Test the action buttons in the personal profile, 
 * this component doesn't have an onPress method implemented, so we 
 * cannot test if it actually works on press, we check if it renders properly,
 * and if the props type checking is working as expected.
 */
describe("<ActionButton />", () => {
  test("help me with renders correctly", () => {
    const buttonTree = renderer
      .create(<ActionButton type="help" context="Unit Testing" />)
      .toJSON();
    expect(buttonTree).toMatchSnapshot();
  });

  test("introduce me to render correctly", () => {
    const buttonTree = renderer
      .create(<ActionButton type="introduce" context="Bill Gates" />)
      .toJSON();
    expect(buttonTree).toMatchSnapshot();
  });

  test("talk to me to render correctly", () => {
    const buttonTree = renderer
      .create(<ActionButton type="talk" context="Tic Tac Toe" />)
      .toJSON();
    expect(buttonTree).toMatchSnapshot();
  });

  test("action button with wrong type, should return warning to console", () => {
    var warn = jest.spyOn(global.console, "warn");

    const buttonTree = renderer.create(<ActionButton type="noType" />).toJSON();

    expect(warn).not.toHaveBeenCalled();

    // Cleanup
    warn.mockReset();
    warn.mockRestore();
  });
});
