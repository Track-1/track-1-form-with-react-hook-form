# Track-1-Form-with-react-hook-form

Track-1의 form구현을 위한 react-hook-form의 서드파티 라이브러리

## Features

- **Create Register with Ref**: register 외부에서도 사용할 수 있는 ref를 반환하는 hook.
- **Context Scope**: 기존의 useForm 반환값과 함게 register 외부에서도 사용할 수 있는 ref와 register를 반환하는 hook.
- **Form with Ref**: 기존의 useContext 반환값과 함게 register 외부에서도 사용할 수 있는 ref와 register를 반환하는 hook.
- **Form Context with Ref**: 유효한 범위에서 useFormContext를 사용할 수 있도록 하는 hook.

## Installation

```bash
npm i track-1-form-with-react-hook-form
```

## Usage

1. Install React-hook-form ( This library should be accompanied by the installation of React Hook Form. )

  ```bash
  npm i react-hook-form
  ```

2. import track-1-form-with-react-hook-form

   ```js
   import {} from "track-1-form-with-react-hook-form"
   ```

3. If you want to use useForm, use useFormWithRef.

  ```js
  const {registerWithRef, instancRef, ...methods} = useFormWithRef({});
  ```

4. If you want to use useFormContext, use useFormContextWithRef.

   ```js
    const {registerWithRef, instancRef, ...methods} = useFormContextWithRef();
   ```

5. Connect with your UI

   ```js
   function Component() {
    const { instanceRef, registerWithRef, ...methods } = useFormWithRef({
    defaultValues: {
      test1: ""
    },
    });

    const handleOnchange = () => {
      console.log("hi")
    }

      return (
        <form>
          <input {...registerWithRef("test1", {
            onChange : handleOnchange
          })}/>
        </form>
      )
    }

   
   function Component() {
    const { instanceRef, registerWithRef, ...methods } = useFormContextWithRef();

    const handleOnchange = () => {
      console.log("hi")
    }

      return (
        <form>
          <input {...registerWithRef("test2", {
            onChange : handleOnchange
          })}/>
        </form>
      )
    }
   ```

6. When you need a ref, use instanceRef.

      ```js
         
       function Component() {
        const { instanceRef, registerWithRef, ...methods } = useFormContextWithRef();

        useEffect(() => {
          if (instanceRef.current) {
            instanceRef.current.focus();
          }
        }, []);

          return (
            <form>
              <input {...registerWithRef("test2")}/>
            </form>
          )
        }
      ```

7. When dynamically adding or removing fields, you can use useDynamicFields.

         |API|기능|params|
         |------|---|---|
         |handleKeyDownEnter|EnterKey 클릭 시 calllbackFn 실행|`e: React.KeyboardEvent<HTMLInputElement>, handleFieldCallbacks?: (() => void)[]`|
         |checkFieldValueDuplicated|입력된 값이 다른 값들과 중복되는지 확인|`alertMessage?: string`|
         |lockDynamicField|입력이 완료된 Field의 재입력을 막음||
         |appendDynamicField|Field 추가|`fieldLimit?: number`|
         |deleteDynamicField|Field 제거|`e: React.MouseEvent<T>, idx: number, appendNewFiled?: boolean`|
         |activeField|Field의 lock을 해제||
         |clickOutside|Field의 외부를 클릭했을 때 callbackFn 실행|` e: Event, ignoredTarget?: HTMLElement, handleFieldCallbacks?: (() => void)[]`|


   

