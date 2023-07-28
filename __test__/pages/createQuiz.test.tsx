import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '@pages/index';

describe('Home', () => {
    it('should render', () => {
        render(<Home/>);
    });
});
