import BeePlugin from './index'


describe("BeePlugin", () => {
    const beeInstance = new BeePlugin()
    test('should test interface', () => {        
        expect(typeof beeInstance.preview).toBe("function")
        expect(typeof beeInstance.reload).toBe("function")
        expect(typeof beeInstance.save).toBe("function")
        expect(typeof beeInstance.saveAsTemplate).toBe("function")
        expect(typeof beeInstance.send).toBe("function")
        expect(typeof beeInstance.showComment).toBe("function")
        expect(typeof beeInstance.start).toBe("function")
        expect(typeof beeInstance.join).toBe("function")
        expect(typeof beeInstance.toggleComments).toBe("function")
        expect(typeof beeInstance.toggleMergeTagsPreview).toBe("function")
        expect(typeof beeInstance.togglePreview).toBe("function")
        expect(typeof beeInstance.toggleStructure).toBe("function")
        expect(typeof beeInstance.getToken).toBe("function")
        expect(typeof beeInstance.load).toBe("function")
        expect(typeof beeInstance.loadStageMode).toBe("function")
        expect(typeof beeInstance.loadWorkspace).toBe("function")
        expect(typeof beeInstance.loadConfig).toBe("function")
    })

    test('should call getToken', async () => {
        await expect(beeInstance.getToken('', '')).rejects.toThrowError(Error);
    })
})