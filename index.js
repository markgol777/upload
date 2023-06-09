const file = document.getElementById('file');
const upload = document.getElementById('upload');

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyC9oEw3aSMHvoBaW0k6u9eI4Te_jan8nms",
    authDomain: "upload-file-71b4b.firebaseapp.com",
    projectId: "upload-file-71b4b",
    storageBucket: "upload-file-71b4b.appspot.com",
    messagingSenderId: "88940065694",
    appId: "1:88940065694:web:d9057953b69e52e7195c8f",
    measurementId: "G-KJ4K359BWT"
};

firebase.initializeApp(firebaseConfig);

//creating firebase storage references

const storage = firebase.storage();
const storageRef = storage.ref();

//getting the file 

file.addEventListener('change', (event) => {
    const file = event.target.files[0];

    upload.addEventListener('click', () => {
        uploadFile(file);
    });
});

// uploading the file

function uploadFile(file) {
    //  creates a reference to a specific file
    const fileRef = storageRef.child(file.name); 
    // uploads the file to storage
    const uploadTask = fileRef.put(file);

    //progress bar
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
            throw error;
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File uploaded successfully.');
                console.log('Download URL:', downloadURL);
            });
        }
    );
}
