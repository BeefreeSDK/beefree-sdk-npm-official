import BeePlugin from './index'

describe("BeePlugin", () => {
  const beeInstance = new BeePlugin()
  test('should test interface', () => {
    expect(typeof beeInstance.preview).toBe('function')
    expect(typeof beeInstance.reload).toBe('function')
    expect(typeof beeInstance.save).toBe('function')
    expect(typeof beeInstance.saveAsTemplate).toBe('function')
    expect(typeof beeInstance.send).toBe('function')
    expect(typeof beeInstance.showComment).toBe('function')
    expect(typeof beeInstance.start).toBe('function')
    expect(typeof beeInstance.join).toBe('function')
    expect(typeof beeInstance.toggleComments).toBe('function')
    expect(typeof beeInstance.toggleMergeTagsPreview).toBe('function')
    expect(typeof beeInstance.togglePreview).toBe('function')
    expect(typeof beeInstance.toggleStructure).toBe('function')
    expect(typeof beeInstance.UNSAFE_getToken).toBe('function')
    expect(typeof beeInstance.load).toBe('function')
    expect(typeof beeInstance.loadStageMode).toBe('function')
    expect(typeof beeInstance.loadWorkspace).toBe('function')
    expect(typeof beeInstance.loadConfig).toBe('function')
    expect(typeof beeInstance.execCommand).toBe('function')
  })

  test('should call UNSAFE_getToken', async () => {
    await expect(beeInstance.UNSAFE_getToken('', '', '')).rejects.toThrowError(Error);
  })
})