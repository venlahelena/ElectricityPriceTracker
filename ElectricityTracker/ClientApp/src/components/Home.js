import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Electricity Price Tracker</h1>
            <p>
                Welcome to the Electricity Price Tracker application! This single-page
                application fetches electricity price data from the current date back to
                7 days. It provides information about the electricity prices for
                different hours of each day.
            </p>
            <p>The application is built using the following technologies:</p>
            <ul>
                <li>
                    <a href="https://get.asp.net/">ASP.NET Core</a> and{' '}
                    <a href="https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx">
                        C#
                    </a>{' '}
                    for cross-platform server-side code
                </li>
                <li>
                    <a href="https://facebook.github.io/react/">React</a> for
                    client-side code
                </li>
                <li>
                    <a href="http://getbootstrap.com/">Bootstrap</a> for layout and
                    styling
                </li>
            </ul>
            <p>
                The <code>ClientApp</code> subdirectory contains the standard React
                application based on the <code>create-react-app</code> template. You can
                use <code>npm</code> commands such as <code>npm test</code> or{' '}
                <code>npm install</code> in that directory to manage the client-side
                dependencies.
            </p>
        </div>
    );
};

export default Home;
