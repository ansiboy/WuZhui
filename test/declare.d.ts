declare module 'mock-browser' {
    namespace mocks {
        class MockBrowser {
            getDocument(): Document
        }
    }

    export { mocks };
}