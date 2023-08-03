import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import RSSFeedPane from './RSSFeedPane';


test("the RSSFeedPane component is rendered", () => {
    render(<RSSFeedPane />)

    const rssFeedPaneElement = screen.getByTestId("rss-feed-pane-component");
    expect(rssFeedPaneElement).toBeInTheDocument();
}
)
